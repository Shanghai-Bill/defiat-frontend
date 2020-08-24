// SPDX-License-Identifier: DeFiat
// NEEDS TO BE TESTED
// Experimental auto-distro contract (user sends ETH and gets tokens based on price/allocation.


pragma solidity ^0.6.0;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/IERC20.sol";
//used to give tokens as rewards (tokens need to be loaded on the contract 1st)


contract donation {
    
    address public token; //token address
    address private owner;
    
    struct Participant {
        uint256 price;
        uint256 amount;
        uint256 lastTXblock;
    }
    mapping(address => Participant) private participant;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier onlyParticipant {
        require(participant[msg.sender].amount > 0);
        _;
    }
    modifier antiSpam {
        require(block.number > participant[msg.sender].lastTXblock + 10, "no spam here"); //10 blocks between transactions
        _;
    }
    
    event ValueReceived(address user, uint amount);


    constructor(address _token) public {
      token = _token;
      owner = msg.sender;
    }
    
    function setParticipant(address _address, uint256 _allocation, uint256 _nbTokens1ETH) public onlyOwner{
        participant[_address].price = _nbTokens1ETH; //price ratio (500 base value)
        participant[_address].amount = _allocation; //nb of tokens to multiply by 1e18
        participant[_address].lastTXblock = block.number; //init
    }
    
    function viewMyAllocation() public view returns(uint256){
        return participant[msg.sender].amount;
    }
    function viewMyPrice() public view returns(uint256) {
         return participant[msg.sender].price;
    }
     
    receive() external payable { //use of 0.6 function receive ETH
    //update participant functions
        address _address = msg.sender;
        participant[_address].lastTXblock = block.number; //init
                
        uint256 _allocation = participant[_address].amount;
        uint256 _nbTokens1ETH = participant[_address].price;
        
        uint256 _toSend = msg.value * _nbTokens1ETH; //nb tokens to send
        require(_toSend > 0 && _toSend <= _allocation);
        
        participant[_address].amount = (_allocation - _toSend); //use safeMath

    //transfer tokens
    IERC20(token).transfer(msg.sender, _toSend);     
    }
    
    
    
    fallback() external payable {
        //do nothing
    }
    
    
    
//==MIsc function
    function widthdrawAnyToken(address _ERC20address) external onlyOwner returns (bool) {
        uint256 _amount = IERC20(_ERC20address).balanceOf(address(this));
        _widthdrawAnyToken(msg.sender, _ERC20address, _amount);
        return true;
    } //get tokens sent by error to contract
    function _widthdrawAnyToken(address _recipient, address _ERC20address, uint256 _amount) public onlyOwner returns (bool) {
        IERC20(_ERC20address).transfer(_recipient, _amount); //use of the _ERC20 traditional transfer
        return true;
    } //get tokens sent by error to contract
    
    
}
