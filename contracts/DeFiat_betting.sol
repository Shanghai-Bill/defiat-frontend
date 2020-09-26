/*
* Copyright (c) 2020 Will_It_Rug
*
* Be a Chad, don't get rugged without a failsafe.
*/ 

// File: @openzeppelin/contracts/math/Math.sol
//

// File: @openzeppelin/contracts/math/SafeMath.sol
pragma solidity ^0.6.0;
/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath{
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
    
        /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}

// File: @openzeppelin/contracts/GSN/Context.sol
/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
contract Context {
    // Empty internal constructor, to prevent people from mistakenly deploying
    // an instance of this contract, which should be used via inheritance.
    constructor () internal { }
    // solhint-disable-previous-line no-empty-blocks

    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

// File: @openzeppelin/contracts/ownership/Ownable.sol
/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        _owner = _msgSender();
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return _msgSender() == _owner;
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol
/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see {ERC20Detailed}.
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

interface IUniswapV2Pair {
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

contract RugVote is Ownable {
    using SafeMath for uint256;
    
    /**
    * @dev contract level variables 
    */
    uint256 private houseFee; //base 1,000
    uint256 private oracleFee; //base 1,000
    uint256 public rugRatio; //base 1000

    /**
    * @dev vote relative variables
    * currency needs to be an ERC20 address (use wETH instead of ETH)
    */
    address public UniPair;
    uint256 public closingDate;
    address public currency; 
    uint256 public votesYES;
    uint256 public votesNO;
    uint256 public reservesStart;
    bool public hasRugged;

    /**
    * @dev variables contain the anount of tokens on each vote.
    */
    struct MyVote {
        uint256 votesYES;
        uint256 votesNO;
    }
    mapping(address => MyVote) public myVote; //users can do 1 vote at a time to start with
    
    
// == constructor & modifers ===================================================================================

    /**
    * @dev simple time-based constructor for voteOpen
    * voteClose also checks if hasRugged == true
    * 
    * constructor is used by the factory to create a vote_contract.
    * inputs:
    *       _UniPair = UniSwap pair to watch
    *       _currency = erc20 token used to voteOpen
    *       _duractionDays = used to define closingDate;
    */
    modifier voteOpen() {
        require(block.timestamp <= closingDate, "The great Oracle of Rugs has spoken my son...");
        _;
    }
    modifier voteClosed() {
        require(block.timestamp >= closingDate || hasRugged == true, "There is still hopium here...");
        _;
    }
    
    constructor(address _creator, address _UniPair, uint256 _durationDays, address _currency) public {
    
    //declared
        UniPair = _UniPair;
        closingDate = block.timestamp.add(_durationDays.mul(86400));
        currency = _currency;
        
        reservesStart = reserves(_UniPair); //sum of TOKENS balances, independant of the decimals
        require(reservesStart > 0, "no reserves found for this pair");
        
    //hard coded
        houseFee = 4; //0.4$
        oracleFee = 1; //0.1%
        rugRatio = 50; //5% of reserves left = rug
        
        _transferOwnership(_creator); //contract creator is the new owner

    }
    
// == Rug Checker ===================================================================================
        
    /**
    * @dev we use the sum of reserves to measure the rug
    * rugCHeck performs a check based on the rugRatio 
    * if reserves at the end of the period are < certain % vs. the initial period
    * the rugCheck determines that there was a liquidity removal
    * 
    * Like houseFee and oracleReward, rugRatio is a base1000 numeral
    */
    function rugCheck() internal view returns(bool) {
        uint256 reservesNow = reserves(UniPair);
        uint256 _rugRatio = (reservesNow).mul(1000).div(reservesStart);
        
        bool _rug = false;
        if(_rugRatio < rugRatio){_rug = true;}
        return _rug;
    }

    function reserves(address _UniPair) internal view returns(uint256){
        uint112 r1; uint112 r2;
        (r1, r2, ) = IUniswapV2Pair(_UniPair).getReserves();
        return uint256(r1).add(uint256(r2));
    }
   
   
 // == THe Good, The Bad, and the Voter ===================================================================================
  
    function voteYES(uint256 _amount) public voteOpen {
   
        //transfer 1st (no reentrancy)
        IERC20(currency).transferFrom(_msgSender(), address(this), _amount);
       
        uint256 _feesAndReward = _amount.mul(houseFee.add(oracleFee)).div(1000);
        uint256 _netAmount = _amount.sub(_feesAndReward);
        
        // updates pool and users' metric
        votesNO = votesYES.add(_netAmount);
        myVote[_msgSender()].votesYES.add(_netAmount);
    }
    
    function voteNO(uint256 _amount) public voteOpen {

        //transfer 1st (no reentrancy)
        IERC20(currency).transferFrom(_msgSender(), address(this), _amount);
       
        uint256 _feesAndReward = _amount.mul(houseFee.add(oracleFee)).div(1000);
        uint256 _netAmount = _amount.sub(_feesAndReward);
        
        // updates pool and users' metric
        votesNO = votesNO.add(_netAmount);
        myVote[_msgSender()].votesNO.add(_netAmount);
    }
    
    function amountToPay(address _address) internal view returns(uint256) {
        uint256 _voteShare = 0;
        if(hasRugged == true){
            _voteShare = (myVote[_address].votesYES).mul(1e18).div(votesYES);
        }
        else if (hasRugged == false){
            _voteShare = (myVote[_address].votesNO).mul(1e18).div(votesNO);
        }
    
        return _voteShare.mul(votesYES.add(votesNO)).div(1e18);
    }
     
    function moneyTalks() public voteClosed {
        IERC20(currency).transfer(_msgSender(), amountToPay(_msgSender()));
    }


// == The Mighty Oracle of Rugs===================================================================================

    /**
    * @dev Behold the great Oracle of Rugs!
    */
    function oracleOfRugs() public voteOpen returns(bool) {
        hasRugged = false;
        
        if(rugCheck() == true){
            hasRugged = true;
            closingDate = block.timestamp.sub(10); //force closes pool. avoids reentrancy with voteOpen
            rewardOracle(_msgSender());
        }
        return hasRugged;
    }
        
    function rewardOracle(address _address) internal {
        require(hasRugged == true, "no rug... no reward");
        uint256 _reward = votesYES.add(votesNO).mul(oracleFee).div(1000);
        IERC20(currency).transfer(_address, _reward);
    }

// == The House ===================================================================================
    function CollectFees(address _address) public voteClosed onlyOwner{
        uint256 _fees = IERC20(currency).balanceOf(address(this)).mul(houseFee).div(1000);
        IERC20(currency).transfer(_address, _fees);
    }
    
    //this one is tricky as pool creators can flush the pool 1 week (604800 seconds) after the end of the vote.
    function flushPool(address _recipient, address _ERC20address) external onlyOwner {
        require(block.timestamp >= closingDate.add(604800), "Wait for end of grace period");
        uint256 _amount = IERC20(_ERC20address).balanceOf(address(this));
        IERC20(_ERC20address).transfer(_recipient, _amount); //use of the _ERC20 traditional transfer
    }
    
// == Getters ===================================================================================
    function getYESodds() public view returns(uint256){
        
    }

}


contract VoteFactory is Ownable {
    
    RugVote public rugVote;
    
    address[] public allVotes;
    uint256 public nbVotes; 
    
    mapping(address => address[]) public myVotes;

   
    constructor() public {
        //call ownable constructor
    }
   
    /**
    * @dev Creates a voting contract where the owner = creator
    */
    function createVote(address _UniPair, address _currency, uint256 _durationDays) public {
    address _rugVote = address(new RugVote(_msgSender(),  _UniPair, _durationDays, _currency));
   
    allVotes.push(_rugVote);
    nbVotes = allVotes.length;
    
    myVotes[_msgSender()].push(_rugVote);
    }
    
    //not sure about that one... let users delete their previous votes.
    function deleteVote(uint256 _index) public {
        uint256 _closingDate;
        address _rugVote = myVotes[_msgSender()][_index];
        (_closingDate,,,,,) =  getVoteInfo( _rugVote);
        
        require(block.timestamp < _closingDate, "only remove closed");
        
        delete myVotes[_msgSender()][_index];
    }
    
    function nbVotesOf(address _address) public view returns(uint256) {
        return myVotes[_address].length;
    }
    
    function votesOf(address _address,uint256 _index) public view returns(address) {
        return myVotes[_address][_index];
    }
    
    
    function getVoteInfo(address _rugVote) public view returns(uint256, address, uint256, uint256, uint256, bool){
            return(
                RugVote(_rugVote).closingDate(),
                RugVote(_rugVote).currency(),
                RugVote(_rugVote).votesYES(),
                RugVote(_rugVote).votesNO(),
                RugVote(_rugVote).reservesStart(),
                RugVote(_rugVote).hasRugged()
                );
        }
} 
    
