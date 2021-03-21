pragma solidity >=0.7.6;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

// WARNING THIS IS NOT GOOD CODE

contract Remix721 is ERC1155Receiver, ERC721Burnable, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  IERC1155 public parts;

  struct Deposit {
      uint256[] partIds;
      uint256[] balances;
  }
  mapping (uint => Deposit) private deposits;

  constructor() public ERC721("Remix", "ETAR") {
    parts = IERC1155(msg.sender);
    _setBaseURI("https://ipfs.io/ipfs/");
  }

  function mintItem(address to, string memory tokenURI)
      internal
      returns (uint256)
  {
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);

      return id;
  }

  function breakdown(uint256 tokenId) public {
    burn(tokenId);
    Deposit memory dep = deposits[tokenId];
    parts.safeBatchTransferFrom(address(this), msg.sender, dep.partIds, dep.balances, "");
  }

  function onERC1155BatchReceived(address operator, address from, uint256[] memory ids, uint256[] memory values, bytes memory data) public virtual override returns (bytes4) {
    deposits[mintItem(from, "")] = Deposit(ids, values);
    return this.onERC1155BatchReceived.selector;
  }

  function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual override returns (bytes4) {
    return "";
  }

}