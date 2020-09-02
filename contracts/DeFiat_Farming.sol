// 10000000000000000000000 = 10,000 tokens
// r.DFT: 0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2
// r.UNI: 0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2
// previosu POOLS to flushPool
// 0x85Ec0832418faff9eF2d69128Cfe86F52d4D4aeF DFT-DFT
// 0x5c2Fed8e40cE254e63Be59553e5188f6398fB195 UNI-DFT



/*
* Copyright (c) 2020 DeFiat.net
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*/

// File: @openzeppelin/contracts/math/Math.sol

// File: @openzeppelin/contracts/utils/Address.sol
pragma solidity ^0.6.0;
/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * This test is non-exhaustive, and there may be false-negatives: during the
     * execution of a contract's constructor, its address will be reported as
     * not containing a contract.
     *
     * IMPORTANT: It is unsafe to assume that an address for which this
     * function returns false is an externally-owned account (EOA) and not a
     * contract.
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly { codehash := extcodehash(account) }
        return (codehash != 0x0 && codehash != accountHash);
    }

    /**
     * @dev Converts an `address` into `address payable`. Note that this is
     * simply a type cast: the actual underlying value is not changed.
     *
     * _Available since v2.4.0._
     */
    function toPayable(address account) internal pure returns (address payable) {
        return address(uint160(account));
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     *
     * _Available since v2.4.0._
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-call-value
        (bool success, ) = recipient.call.value(amount)("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }
}

// File: @openzeppelin/contracts/math/SafeMath.sol
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
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
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
} //adding ALLOWED method

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
}


pragma solidity ^0.6.0;


contract DeFiat_Farming_v5 {
    using SafeMath for uint256;

    //Structs
    struct PoolMetrics {
        address stakedToken;
        uint256 staked;             // sum of tokens staked in the contract
        uint256 stakingFee;         // entry fee
        
        uint256 stakingPoints;      // baseline for share of stake
        uint256 rewardsPoints;      // baseline for rewards

        address rewardToken;
        uint256 rewards;        // rewards still in the pool
        uint256 totalRewards;   // totalRewards to be consumed (fees + loaded)

        uint256 startTime;      // when the pool opens
        uint256 closingTime;    // when the pool closes. 
        uint256 duration;       // duration of the staking
        uint256 lastEvent;   // last time metrics were updated.
        
        uint256  ratePerToken;      // CALCULATED pool reward Rate per Token (calculated based on total stake and time)
    }
    PoolMetrics public poolMetrics;

    struct UserMetrics {
            uint256 stake;          // native token stake (balanceOf)
            uint256 stakingPoints;  // acrruing over time. Does not take into account current ones
            uint256 lastEvent;
            
            uint256 rewardAccrued;  // accrued rewards over time based on staking points
            uint256 rewardsPaid;    // what the user already consumed, to remove from rewardsAccrued

            uint256 lastTxBlock;    // latest transaction from the user (antiSpam)
    }
    mapping(address => UserMetrics) public userMetrics;

//== constructor 
    constructor(address _stakedToken, address _rewardToken, uint256 _feeBase1000, uint256 _durationHours, uint256 _delayStartHours) public {
        poolOperator = msg.sender;
        
        poolMetrics.stakedToken = address(_stakedToken);
        poolMetrics.rewardToken = address(_rewardToken);
        poolMetrics.stakingFee = _feeBase1000; //3%
        
        poolMetrics.duration = _durationHours.mul(3600); // ~7 1/4 days --> 1 week of staking // NOT ENOUGH. Go 1months.
        poolMetrics.startTime = block.timestamp + _delayStartHours.mul(3600);
        poolMetrics.closingTime = block.timestamp + poolMetrics.duration;
    }

//==EVENTS
    event PoolInitalized(uint256 amountAdded, string  _desc);
    event RewardTaken(address indexed user, uint256 reward, string  _desc);

    event userStaking(address indexed user, uint256 amount, string  _desc);
    event userWithdrawal(address indexed user, uint256 amount, string  _desc);

    modifier poolLive() {
        require(block.timestamp >= poolMetrics.startTime,"Pool not started Yet"); //good for delayed starts.
        require(block.timestamp <= poolMetrics.closingTime,"Pool closed"); //good for delayed starts.
        _;
    }
    modifier poolStarted() {
        require(block.timestamp >= poolMetrics.startTime,"Pool not started Yet"); //good for delayed starts.
        _;
    }
    modifier poolEnded() {
        require(block.timestamp > poolMetrics.closingTime,"Pool not started Yet"); //good for delayed starts.
        _;
    }
    modifier antiSpam(uint256 _blocks) {
        require(block.number >= userMetrics[msg.sender].lastTxBlock.add(_blocks), "Wait between Transactions");
        userMetrics[msg.sender].lastTxBlock = block.number; //update
        _;
    } 
 

    
//BASICS 
    function setFee(uint256 _fee) public onlyPoolOperator {
        poolMetrics.stakingFee = _fee;
    }
    
    //testnet only
    function setRewardToken(address _token) public onlyPoolOperator {
        poolMetrics.rewardToken = _token;
    }
    function setStakingToken(address _token) public onlyPoolOperator {
        poolMetrics.stakedToken = _token;
    }
    
    function currentTime() public view returns (uint256) {
        return SafeMath.min(block.timestamp, poolMetrics.closingTime); //allows expiration
    } // SafeMath.min(now, endTime)
    
//Points locking    
    function viewPoolPoints() public view returns(uint256) {
            uint256 _previousPoints = poolMetrics.stakingPoints;    // previous points shapshot 
            uint256 _previousStake = poolMetrics.staked;             // previous stake snapshot
            
            uint256 _timeHeld = currentTime().sub(
                        SafeMath.max(poolMetrics.lastEvent, poolMetrics.startTime)
                                                 );                 // time held since lastEvent.
            
            return  _previousPoints.add(_previousStake.mul(_timeHeld));    //generated points since event
    }
    function lockPoolPoints() public returns (uint256 ) { //ON STAKE/UNSTAKE EVENT
            uint256 _currentPoints = viewPoolPoints() ;     // snapshot
            poolMetrics.lastEvent = currentTime();   // update lastEvent
            return poolMetrics.stakingPoints = _currentPoints;
        } 
    function viewPointsOf(address _address) public view returns(uint256) {
            uint256 _currentPoints = userMetrics[_address].stakingPoints;    // snapshot
            uint256 _previousStake = userMetrics[_address].stake;            // stake before event
        
            uint256 _timeHeld = currentTime().sub(
                        SafeMath.max(userMetrics[_address].lastEvent, poolMetrics.startTime)
                                                 );                          // time held since lastEvent
            
            uint256 _result = _currentPoints.add(_previousStake.mul(_timeHeld));   
            if(_result > poolMetrics.stakingPoints){_result = poolMetrics.stakingPoints;}
            return _result;
    }
    function lockPointsOf(address _address) public returns (uint256) {
            uint256 _currentPoints =  viewPointsOf(_address); 
            userMetrics[_address].lastEvent = currentTime(); 
            return userMetrics[_address].stakingPoints = _currentPoints;
    }


//Staking & unstaking
    function stake(uint256 _amount) public poolLive antiSpam(1) { //updateReward and checkStart are modifiers
        require(_amount > 0, "Cannot stake 0");
        
        // calculate true amount received
            uint256 _balanceNow = IERC20(address(poolMetrics.stakedToken)).balanceOf(address(this));
            IERC20(poolMetrics.stakedToken).transferFrom(msg.sender, address(this), _amount); //will require allowance
            uint256 amount = IERC20(address(poolMetrics.stakedToken)).balanceOf(address(this)).sub(_balanceNow); //actually received
        
        // discount amount by fee, add fee to totalRewards
            uint256 _fee = amount.mul(poolMetrics.stakingFee).div(1000);
            poolMetrics.totalRewards = poolMetrics.totalRewards.add(_fee);
            poolMetrics.rewards = poolMetrics.rewards.add(_fee);
        
        // update poolMetrics and userMetrics with discounted amount;
            amount = amount.sub(_fee);
            
            lockPoolPoints(); // stores poolPoints metrics;
            poolMetrics.staked = poolMetrics.staked.add(amount); 
        
            lockPointsOf(msg.sender); // stores userPoints metrics;
            userMetrics[msg.sender].stake = userMetrics[msg.sender].stake.add(amount);

        // emit
            emit userStaking(msg.sender, amount, "Staking... ... ");
    }
    
    function unStake(uint256 amount) public antiSpam(1) poolStarted{ 
        require(amount > 0, "Cannot withdraw 0");
        require(amount <- userMetrics[msg.sender].stake, "Cannot withdraw more than stake");
        IERC20(poolMetrics.stakedToken).transfer(msg.sender, amount);
        
        lockPoolPoints(); //updates since previous stake
        poolMetrics.staked = poolMetrics.staked.sub(amount);
        
        lockPointsOf(msg.sender); //update since previous stake
        userMetrics[msg.sender].stake = userMetrics[msg.sender].stake.sub(amount);
        
        emit userWithdrawal(msg.sender, amount, "Widhtdrawal");
    }
 
    function unstakeAll() external poolStarted{
        unStake(userMetrics[msg.sender].stake);
    }
    function myStake() public view returns(uint256) {
        return userMetrics[msg.sender].stake;
    }
    
//Rewards 
    function eligibleRewardOf(address _address) public returns(uint256) {
        lockPointsOf(_address);lockPoolPoints(); //lock
        uint256 _reward = viewEligibleRewardOf(_address);
        return _reward;
    }  
    function viewEligibleRewardOf(address _address) public view returns(uint256) {
        require(poolMetrics.rewards > 0, "No Rewards in the Pool");
        
        // POOL REWARDS BASE
        uint256 _elapsedTime = SafeMath.sub(currentTime(), poolMetrics.startTime);
        uint256 _poolRewardsBase;
        
        // BOOST (boost allows for full rewards even when the pool staking is low)
        if(Boosted == true){
            _poolRewardsBase = poolMetrics.totalRewards
                                .mul(_elapsedTime).div(poolMetrics.duration);}
        else {
            _poolRewardsBase = SafeMath.min(poolMetrics.staked, poolMetrics.totalRewards)
                                .mul(_elapsedTime).div(poolMetrics.duration);}
        
        //USER STAKING POINTS RATE
        uint256 _pointsRate =  viewPointsOf(_address).mul(1e18).div(viewPoolPoints()); //1e18 staking% of user.
        //user and pool points have accrued over time with staking.


        //USER POOLxPOINTS RATE
        uint256 _reward = _poolRewardsBase.mul(_pointsRate).div(1e18);  //convert Points rate to pool totalRewards
        
        //return _reward factoring greylist
        if(poolMetrics.rewards == 0) {_reward = 0;}
        //if(greylist[_msgSender()] = true){_rewards = _rewards.div(100);} //gift to our fellow Twitter hackers ;-)
        return _reward;
    }
    
    function takeRewards() public antiSpam(1) poolStarted{ //1 blocks between actions

        uint256 _reward = eligibleRewardOf(msg.sender); //locks times and events. store _reward
        require (_reward > 0, "No rewards for the user");
        
        poolMetrics.rewards = poolMetrics.rewards.sub(_reward);     // update pool rewards live counter
            
        userMetrics[msg.sender].rewardsPaid = _reward;   // update user paid rewards
        userMetrics[msg.sender].stakingPoints = 0;       // erase staking points from user (points have been converted)
            
        IERC20(poolMetrics.rewardToken).transfer(msg.sender, _reward);  // transfer reward
        eligibleRewardOf(msg.sender);                                   // relaunch counters
        emit RewardTaken(msg.sender, _reward, "Rewards Sent");  
    }
    
    function myRewards() public view returns(uint256) {
        return  viewEligibleRewardOf(msg.sender);
    }
    
//== OPERATOR FUNCTIONS ==
    address public poolOperator;
    
    function setPoolOperator(address _address) public onlyPoolOperator {
        poolOperator = _address;
    }
    modifier onlyPoolOperator() {
        require(msg.sender == poolOperator, "msg.sender is not allowed to operate Pool");
        _;
    }
    
    bool public Boosted = false; //allows faster rewards at start
    function setBoostedRewards(bool _bool) public onlyPoolOperator {
        Boosted = _bool;
    }
    
    function loadRewards(uint256 _amount) public { //load tokens in the rewards pool. recalculates pool rewardsPoints.
        lockPoolPoints();
        uint256 _previousPoints = poolMetrics.rewardsPoints; //when reloading
       
        uint256 _balanceNow = IERC20(address(poolMetrics.rewardToken)).balanceOf(address(this));
        IERC20(address(poolMetrics.rewardToken)).transferFrom( msg.sender,  address(this),  _amount);     // !! need to allow contract 1st
        uint256 amount = IERC20(address(poolMetrics.rewardToken)).balanceOf(address(this)).sub(_balanceNow); //actually received
        
        uint256 _timeRemaining = SafeMath.sub(poolMetrics.closingTime, currentTime()); //to add more points on reload.
        poolMetrics.rewardsPoints = SafeMath.mul(_timeRemaining, poolMetrics.rewards).add(_previousPoints);
        
        poolMetrics.totalRewards = poolMetrics.totalRewards.add(amount);
        poolMetrics.rewards = poolMetrics.rewards.add(amount);
        poolMetrics.staked = SafeMath.add(poolMetrics.staked,1e18); //avoids div/0 underflow

    }

//== UTILS === (only work when pool has ended)
function flushPool(address _recipient, address _ERC20address) external onlyPoolOperator poolEnded{ // poolEnded returns(bool) {
        uint256 _amount = IERC20(_ERC20address).balanceOf(address(this));
        IERC20(_ERC20address).transfer(_recipient, _amount); //use of the _ERC20 traditional transfer
        //return true;
    } //get tokens sent by error to contract
function killPool() public onlyPoolOperator poolEnded returns(bool) {
        selfdestruct(msg.sender);
        //return true;
    } //frees space on the ETH chain

}

//== END CONTRACT ==
pragma solidity ^0.6.0;
interface Interface_DFT_farming {
    // at address: 
    function stake(uint256 amount) external; //stake shitcoins
    function unStake(uint256 amount) external; //wd Stake only
    function takeRewards() external; //wd reward

    function myRewards() external view returns(uint256);
    function myStake() external view returns(uint256);
    // 100000000000000000000 = 100 TOKENS
}

interface InterfaceToken {
    // at address: 0xB571d40e4A7087C1B73ce6a3f29EaDfCA022C5B2
    function balanceOf(address account) external ;
    function approve(address spender, uint256 amount) external;
}
interface I_Defiat_Points {
    // 0x70c7d7856e1558210cfbf27b7f17853655752453
    function overrideDiscount(address _address, uint256 _newDiscount) external;
    //whitelist the Locking Contract at 100 (100%) discount
}

