// SPDX-License-Identifier: DeFiat

pragma solidity ^0.6.0;

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract donation {
    
    address public token; //token address
    address private owner;
    uint256 public deadline;
    
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
        require(block.number > participant[msg.sender].lastTXblock + 1, "no spam here"); //nb blocks between transactions
        _;
    }
    modifier donationsEnded {
        require(block.timestamp > deadline, "donation period not over"); //nb blocks between transactions
        _;
    }
        
    event ValueReceived(address user, uint amount);


    constructor(address _token, uint256 _durationDays) public {
      assert(1 ether == 1e18); //not sure we will use
      token = _token;
      owner = msg.sender;
      deadline = block.timestamp + _durationDays*(24*3600);
    }
    
    function setParticipant(address _address, uint256 _maxETH, uint256 _nbTokens1ETH) public onlyOwner{
        participant[_address].price = _nbTokens1ETH; //price ratio (500 base value)
        participant[_address].amount = _maxETH * _nbTokens1ETH* 1e18; //max nb tokens to distribute
        participant[_address].lastTXblock = block.number; //init
    }
    
    function viewMyAllocation(address _address) public view returns(uint256){
        return participant[_address].amount;
    }
    function viewMyPrice(address _address) public view returns(uint256) {
         return participant[_address].price;
    }
     
    receive() external payable antiSpam{    //use of pragme ^0.6.0 functions to receive ETH
    //update participant functions
        address _address = msg.sender;
        participant[_address].lastTXblock = block.number; //init
                
        uint256 _allocation = participant[_address].amount;
        uint256 _nbTokens1ETH = participant[_address].price;
        
        uint256 _toSend = msg.value * _nbTokens1ETH; //nb tokens to send
        require(_toSend > 0 && _toSend <= _allocation);
        
        participant[_address].amount = (_allocation - _toSend); //use safeMath no needed as check done before.

    //transfer tokens
    IERC20(token).transfer(msg.sender, _toSend);     
    }
    
    fallback() external payable {
        //do nothing
    }
    
    
    
//== onlyOwner functions
    function widthdrawAllTokens(address _ERC20address) public onlyOwner donationsEnded returns (bool) {
        uint256 _amount = IERC20(_ERC20address).balanceOf(address(this));
        _widthdrawAnyToken(msg.sender, _ERC20address, _amount);
        return true;
    } //get tokens sent by error to contract
    
    function _widthdrawETH() public onlyOwner donationsEnded returns (bool) {
        msg.sender.transfer(address(this).balance);        
        return true;
    }
        
    function _widthdrawAnyToken(address _recipient, address _ERC20address, uint256 _amount) 
        public onlyOwner donationsEnded returns (bool) {
        IERC20(_ERC20address).transfer(_recipient, _amount); //use of the _ERC20 traditional transfer
        return true;
    } //get tokens sent by error to contract
    
    function _killContract() public onlyOwner donationsEnded returns (bool) {
        widthdrawAllTokens(address(token));
        _widthdrawETH ();
        selfdestruct(msg.sender);
        
        return true;
    } //get tokens sent by error to contract
    
}
