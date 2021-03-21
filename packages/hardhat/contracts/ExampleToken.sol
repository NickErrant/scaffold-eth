pragma solidity >=0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExampleToken is ERC20 {

    constructor() ERC20("Unlimited", "UNLI") public {
    }

    function mintTokens(address to) public {
      _mint(msg.sender, 1000000000000000000000000);
      approve(to, 1000000000000000000000000);
    }
}