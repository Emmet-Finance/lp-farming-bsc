// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.8.19;

import "hardhat/console.sol";


interface ISmartChefV2 {
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

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

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
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);


    function stake(uint _amount) external;
 
}

error youDontHaveBalance();
error youCantSetZeroAddress();
error TransferFaild();
error YouAreNotAuthorise();
error StakingTimeIsRemain();

contract stakingBiswap {
    
    modifier onlyOwner {
        require(msg.sender == owner,"your are not owner");
        _;
    }

    ISmartChefV2 biswap;
    address public owner;
    constructor() {
      owner=msg.sender;
      biswap = ISmartChefV2(0xB8A6F44fDD902627A578876ab9fEdCC1F244eDA8);
    }
     
    
    mapping(address => stake[]) public staking;
    mapping(address => bool) public isStaking;
    address[] public stakerAddress;
    
    struct stake{
    uint256 amount;    
    }

    //Need to approve token first
    function stakeRex(uint256 _amount) external {
        require(_amount > 0, "Stake amount must be greater than 0");
        if(biswap.balanceOf(msg.sender)<_amount){
            revert youDontHaveBalance();
        }
        staking[msg.sender].push(stake(_amount));
        bool transfer = biswap.transferFrom(msg.sender,address(this),_amount);
        if(transfer){
            biswap.approve(address(biswap),_amount);
            biswap.stake(_amount);
        }
        if(!isStaking[msg.sender]) {
			stakerAddress.push(msg.sender);
		}
		// update stakng status
		isStaking[msg.sender] = true;
    }



    
    // function getTex(uint256 _amount) public view returns(uint256){
    // return((_amount/10000)*fee);
    // }

    // function stakingReward(uint256 _amount) public view returns (uint256) {
    //     return ((_amount / 10000) * Reward);
    // }

    // function setBankAddress( address _bankAccount) public onlyOwner {
    // if(_bankAccount == address(0)){
    //     revert youCantSetZeroAddress();
    // }
    // bank=_bankAccount;
    // }

    // function setTexCallector( address _texCallector) public onlyOwner {
    // if(_texCallector == address(0)){
    //     revert youCantSetZeroAddress();
    // }
    // texCallector=_texCallector;
    // }

    // function setMyToken( address _token) public onlyOwner {
    // if(_token == address(0)){
    //     revert youCantSetZeroAddress();
    // }
    // myToken=IERC20(_token);
    // }

    
    // function addCustomToken(address _token) public onlyOwner {
    //     Addedtokens++;
    //     tokens[Addedtokens]=_token;
    // }


    // function swapeToken(uint256 _tokenNb, address _swapeWith, uint256 _amount) public {
    //     tokenCreation token = tokenCreation(tokens[_tokenNb]);
       
    //     if(IERC20(_swapeWith).balanceOf(msg.sender)<_amount){
    //         revert youDontHaveBalance();
    //     }
    //     uint256 tex = getTex(_amount);
    //     uint256 remain = (_amount - tex);
    //     IERC20(_swapeWith).transferFrom(msg.sender,address(this),remain);
    //     IERC20(_swapeWith).transferFrom(msg.sender,texCallector,tex);
    //     address owner = token.owner();
    //     token.transferFrom(owner,msg.sender,_amount);
    // }

    // function BuyToken(uint256 _tokenNb, uint256 _amount ) public payable {
    //     tokenCreation token = tokenCreation(tokens[_tokenNb]);
    //     address owner = token.owner();
    //     token.transferFrom(owner,msg.sender,_amount);
    // }

    // function withDraw() public onlyOwner{
    //     (bool success,)=msg.sender.call{value:address(this).balance}("");
    //     if(!success){
    //     revert TransferFaild();
    //     } 
    // }

    // function Staking(uint256 _tokenNb , uint256 _amount, uint256 _endTime) public {
    //   tokenCreation token = tokenCreation(tokens[_tokenNb]);
    //  if(token.balanceOf(msg.sender)<_amount){
    //         revert youDontHaveBalance();
    //  }
    // token.transferFrom(msg.sender,address(this),_amount);
    // stakingId++;
    // address Tkn = tokens[_tokenNb];
    // uint256 time =(block.timestamp+_endTime);
    // staking[stakingId]=stake(stakingId,msg.sender,Tkn,_amount,block.timestamp,time);
    // }

    // function WithdrawStakingTokens(uint256 _stakingId) public {
    //     stake memory Stake = staking[_stakingId];
              
    //     if(msg.sender != Stake.staker){
    //         revert YouAreNotAuthorise();
    //     }
    //     if(block.timestamp < Stake.endTime){
    //         revert StakingTimeIsRemain();
    //     }
        
    //     uint256 reward = stakingReward(Stake.amount);

    //     IERC20(Stake.token).transfer(msg.sender,Stake.amount);
    //     myToken.transfer(msg.sender,reward);
    //     delete staking[stakingId];
    // }

       

    // function createToken(string memory name, string memory symbol, uint256 initialSupply, address owner) public returns (address) {
    //     tokenCreation token = new tokenCreation(name, symbol,owner,initialSupply);        
    //     Addedtokens++;
    //     tokens[Addedtokens]=address(token);
    //     emit TokenCreated(address(token), owner);
    //     return address(token);
    // }



}