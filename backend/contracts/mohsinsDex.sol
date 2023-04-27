pragma solidity >=0.8.19;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract tokenCreation is ERC20 {
    
    modifier onlyOwner {
        require(msg.sender == owner,"your are not owner");
        _;
    }


    address public owner;
    constructor(string memory name, string memory symbol, address _addr, uint256 initialSupply) ERC20(name, symbol) {
            owner=_addr;
        _mint(_addr,initialSupply);
    }
     
    function mint(address addr, uint256 _amount) public onlyOwner {
        _mint(addr,_amount);
    }

}



error youDontHaveBalance();
error youCantSetZeroAddress();
error TransferFaild();
error YouAreNotAuthorise();
error StakingTimeIsRemain();


contract mohsinsDex is Ownable {
event TokenCreated(address indexed tokenAddress, address indexed creator);

    mapping(uint256 => address) public tokens;
    mapping(uint256=> stake)public staking;

    struct stake{
        uint256 stakingId;
        address staker; 
        address token;
        uint256 amount;
        uint256 startTime;
        uint256 endTime;
    } 
    uint256 public Addedtokens;
    uint256 fee = 200;
    uint256 Reward = 300;
    uint256 public stakingId;
    address public bank;
    address public texCallector;
    IERC20 myToken;


    function getTex(uint256 _amount) public view returns(uint256){
    return((_amount/10000)*fee);
    }

    function stakingReward(uint256 _amount) public view returns (uint256) {
        return ((_amount / 10000) * Reward);
    }

    function setBankAddress( address _bankAccount) public onlyOwner {
    if(_bankAccount == address(0)){
        revert youCantSetZeroAddress();
    }
    bank=_bankAccount;
    }

    function setTexCallector( address _texCallector) public onlyOwner {
    if(_texCallector == address(0)){
        revert youCantSetZeroAddress();
    }
    texCallector=_texCallector;
    }

    function setMyToken( address _token) public onlyOwner {
    if(_token == address(0)){
        revert youCantSetZeroAddress();
    }
    myToken=IERC20(_token);
    }

    
    function addCustomToken(address _token) public onlyOwner {
        Addedtokens++;
        tokens[Addedtokens]=_token;
    }


    function swapeToken(uint256 _tokenNb, address _swapeWith, uint256 _amount) public {
        tokenCreation token = tokenCreation(tokens[_tokenNb]);
       
        if(IERC20(_swapeWith).balanceOf(msg.sender)<_amount){
            revert youDontHaveBalance();
        }
        uint256 tex = getTex(_amount);
        uint256 remain = (_amount - tex);
        IERC20(_swapeWith).transferFrom(msg.sender,address(this),remain);
        IERC20(_swapeWith).transferFrom(msg.sender,texCallector,tex);
        address owner = token.owner();
        token.transferFrom(owner,msg.sender,_amount);
    }

    function BuyToken(uint256 _tokenNb, uint256 _amount ) public payable {
        tokenCreation token = tokenCreation(tokens[_tokenNb]);
        address owner = token.owner();
        token.transferFrom(owner,msg.sender,_amount);
    }

    function withDraw() public onlyOwner{
        (bool success,)=msg.sender.call{value:address(this).balance}("");
        if(!success){
        revert TransferFaild();
        } 
    }

    function Staking(uint256 _tokenNb , uint256 _amount, uint256 _endTime) public {
      tokenCreation token = tokenCreation(tokens[_tokenNb]);
     if(token.balanceOf(msg.sender)<_amount){
            revert youDontHaveBalance();
     }
    token.transferFrom(msg.sender,address(this),_amount);
    stakingId++;
    address Tkn = tokens[_tokenNb];
    uint256 time =(block.timestamp+_endTime);
    staking[stakingId]=stake(stakingId,msg.sender,Tkn,_amount,block.timestamp,time);
    }

    function WithdrawStakingTokens(uint256 _stakingId) public {
        stake memory Stake = staking[_stakingId];
              
        if(msg.sender != Stake.staker){
            revert YouAreNotAuthorise();
        }
        if(block.timestamp < Stake.endTime){
            revert StakingTimeIsRemain();
        }
        
        uint256 reward = stakingReward(Stake.amount);

        IERC20(Stake.token).transfer(msg.sender,Stake.amount);
        myToken.transfer(msg.sender,reward);
        delete staking[stakingId];
    }

       

    function createToken(string memory name, string memory symbol, uint256 initialSupply, address owner) public returns (address) {
        tokenCreation token = new tokenCreation(name, symbol,owner,initialSupply);        
        Addedtokens++;
        tokens[Addedtokens]=address(token);
        emit TokenCreated(address(token), owner);
        return address(token);
    }


}
