# lp-farming-bsc

info:
function deposit:
this function is in the autoBsw contract for check shares first call these functions & then we can call the stack function of the SmartChefV2 smart contract 

contracts:
The main contract is a biswap token contract that interacts with both contract autoBSw and SmartChefV2

What I have Done?

1:make inviroment for forntend & smart contract

2:Fontend for stacking & withdraw functions is completed!

3:wite scripts for testing the code & functionalities but in that scripts I know a problem

4:write a smart contract that saves the user's data against staking
write two functions 
1: stakeToken for staking tokens to the biswap(SmartChefV2),
2: depositToBSW This token is for depositing token in the autoBSw but autosbsw have the condition that the smart contract can't deposit tokens in the autoBSW contract!

how do you check this?
first, pull the repo & than 
go to the backend folder and type cmd 
"npm i"
and after installing node modules now type cmd
"npm run local"
scripts will be run & the error will appear. 
& all scripts write in `scripts/deploy.js` folder
