pragma solidity >=0.7.6;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

// WARNING THIS IS NOT GOOD CODE

contract StakeRaffle is Ownable {
    using SafeERC20 for IERC20;

  struct Raffle {
      uint256 startTime;
      uint256 endTime;
      uint256 entryFee;
      uint256 prizeId;
      uint256 lBonus;
      uint256 ticketIndex;
      uint256 numOfWinners;
  }

  struct Account {
      uint256 cashBalance;
      uint256 lBonus;
      uint256 lockedCash;
  }

  enum TicketStatus {
      NO_TICKET,
      ENTERED,
      PAID
  }

  struct Ticket {
      uint segStart;
      uint segEnd;
      TicketStatus status;
  }

  mapping (uint256 => Raffle) public raffles;
  mapping (address => Account) public accounts;
  mapping (uint256 => Ticket) public tickets;
  mapping (address => bool) public whitelist;
  mapping (uint256 => uint256[]) public winners;
  IERC20 public paymentToken;
  uint256 public raffleCounter;

  function updatePaymentToken(address cash) public onlyOwner {
      paymentToken = IERC20(cash);
  }

  function getTicketId(address account, uint256 raffleId) public view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(account,raffleId)));
  }

  function getTicketStatus(uint256 ticketId) public view returns (TicketStatus) {
      return tickets[ticketId].status;
  }

  function mintTicket(address account, uint raffleId, uint segLength) internal {
      uint ticketIndex = raffles[raffleId].ticketIndex;
      tickets[getTicketId(account, raffleId)] = Ticket(ticketIndex, ticketIndex + segLength - 1, TicketStatus.ENTERED);
      raffles[raffleId].ticketIndex += segLength;
  }

  function updateTicket(uint256 ticketId, TicketStatus status) internal {
      tickets[ticketId].status = status;
  }

  function addRaffle(
      uint256 startTime,
      uint256 endTime,
      uint256 entryFee,
      uint256 prizeId,
      uint256 lBonus,
      uint256 numOfWinners
    )
    public
    onlyOwner
  {
      raffleCounter++;
      raffles[raffleCounter] = Raffle({
          startTime: startTime,
          endTime: endTime,
          entryFee: entryFee,
          prizeId: prizeId,
          lBonus: lBonus,
          numOfWinners: numOfWinners,
          ticketIndex: 0
      });
  }

  function stake(uint256 raffleId)
    public
  {
      address user = msg.sender;
      require(whitelist[user], "Not whitelisted");
      uint256 raffleTicket = getTicketId(user, raffleId);
      require(getTicketStatus(raffleTicket) == TicketStatus.NO_TICKET, "Already registered");

      Raffle memory raffle = raffles[raffleId];
      require(block.timestamp >= raffle.startTime && block.timestamp <= raffle.endTime, "Raffle not active");
      
      Account storage account = accounts[user];
      uint256 availableBalance = account.cashBalance - account.lockedCash;
      if (availableBalance < raffle.entryFee) {
          paymentToken.safeTransferFrom(user, address(this), raffle.entryFee - availableBalance);
      }
      
      account.lockedCash += raffle.entryFee;
      mintTicket(user, raffleId, raffle.entryFee + account.lBonus);
  }

  function withdraw()
    public
  {
    Account storage account = accounts[msg.sender];
    paymentToken.safeTransfer(msg.sender, account.cashBalance - account.lockedCash);
    account.cashBalance = account.lockedCash;
  }

  function deposit(uint256 amount)
    public
    {
        paymentToken.safeTransferFrom(msg.sender, address(this), amount);
        Account storage account = accounts[msg.sender];
        account.cashBalance += amount;
    }

  function redeem(uint256 raffleId) public {
      address user = msg.sender;
      uint ticketId = getTicketId(user, raffleId);
      Ticket memory raffleTicket = tickets[ticketId];
      require(raffleTicket.status == TicketStatus.ENTERED);
      Raffle memory raffle = raffles[raffleId];
      uint256 arrLen = winners[raffleId].length;
      uint256[] memory arr = winners[raffleId];
      require(arrLen > 0, "Awaiting Draw");

      bool didWin;
      for (uint256 i = 0; i < arrLen; i++) {
          uint wNum = arr[i];
          if (raffleTicket.segStart <= wNum && wNum <= raffleTicket.segEnd) {
              didWin = true;
              break;
          }
      }

      Account storage account = accounts[user];
      if (didWin) {
        account.cashBalance -= raffle.entryFee;
        account.lBonus = 0;
        // shoe mint happens here maybe
      } else {
        account.lBonus += raffle.lBonus;
      }

      account.lockedCash -= raffle.entryFee;
      updateTicket(ticketId, TicketStatus.PAID);
  }

  function drawWinners(uint256 raffleId, uint256[] memory winNos)
    public
    onlyOwner
    {
        Raffle storage raffle = raffles[raffleId];
        require(block.timestamp > raffle.endTime && raffle.endTime != 0 && winners[raffleId].length == 0, "Raffle not over");
        require(raffle.numOfWinners == winNos.length, "Wrong number of winners");
        winners[raffleId] = winNos;
    }
}
