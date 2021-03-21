pragma solidity >=0.7.6;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./StakeRaffle.sol";
import "./Remix721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";

// WARNING THIS IS NOT GOOD CODE

contract RemixableNFT is ERC1155Receiver, ERC1155PresetMinterPauser {
    using SafeERC20 for IERC20;

    StakeRaffle public raffle;
    Remix721 public wrapper;
    mapping (uint256 => uint256) public lastPrice;
    uint256 public priceDelta = 2*10**18;
    IERC20 public paymentToken;


  constructor(address _paymentToken) public ERC1155PresetMinterPauser("https://game.example/api/item/{id}.json") {
        raffle = new StakeRaffle();
        wrapper = new Remix721();
        paymentToken = IERC20(_paymentToken);
        raffle.updatePaymentToken(_paymentToken);
        raffle.updatePartsToken(address(this));
    }

    function updateDelta(uint256 _delta) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        priceDelta = _delta;
    }

    function updatePaymentToken(address cash) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        paymentToken = IERC20(cash);
        raffle.updatePaymentToken(cash);
    }

    function nextPrice(uint256 partId) public view returns (uint256) {
        return lastPrice[partId] + priceDelta;
    }

    function prevPrice(uint256 partId) public view returns (uint256) {
        return lastPrice[partId] - priceDelta;
    }

    function addDrop(
      uint256 startTime,
      uint256 endTime,
      uint256 entryFee,
      uint256 lBonus,
      uint256 numOfWinners,
      uint256[] memory _prizes) public {
        require(hasRole(MINTER_ROLE, _msgSender()));
        raffle.addRaffle(startTime, endTime, entryFee, lBonus, numOfWinners, _prizes);
         uint256[] memory values = new uint256[](_prizes.length);
        for (uint256 i = 0; i < _prizes.length; i++) {
            values[i] = numOfWinners;
            lastPrice[_prizes[i]] = entryFee/5;
        }
        _mintBatch(address(raffle), _prizes, values, "");
        _mintBatch(address(this), _prizes, values, "");
    }

    function batchBuy(uint256[] memory _parts, uint256 maxTotal) public {
        uint total;
        for(uint256 i = 0 ; i < _parts.length; i++) {
            uint256 next = nextPrice(_parts[i]);
            total += next;
            lastPrice[_parts[i]] = next;
        }
        require(total <= maxTotal);
        paymentToken.safeTransferFrom(msg.sender, address(this), total);
        uint256[] memory values = new uint256[](_parts.length);
        for (uint256 i = 0; i < values.length; i++)
            values[i] = 1;
        safeBatchTransferFrom(address(this), msg.sender, _parts, values, "");
    }

    function batchSell(uint256[]memory _parts, uint256 minTotal) public {
        uint total;
        for(uint256 i = 0 ; i < _parts.length; i++) {
            uint256 next = prevPrice(_parts[i]);
            total += next;
            lastPrice[_parts[i]] = next;
        }
        require(total >= minTotal);
        paymentToken.safeTransfer(msg.sender, total);
        uint256[] memory values = new uint256[](_parts.length);
        for (uint256 i = 0; i < values.length; i++)
            values[i] = 1;
        safeBatchTransferFrom(msg.sender, address(this), _parts, values, "");
    }

    function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual override returns (bytes4) {
        return "";
    }
}
