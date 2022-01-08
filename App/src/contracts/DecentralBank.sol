pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Tether _tether, RWD _rwd) public {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        require(_amount>0, 'amount should be greater than zero');
        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;

    }

    function issueTokens() public {
        require( msg.sender == owner);

        for(uint i = 0;i<stakers.length ;i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] /9 ;
            if(balance > 0){
                rwd.transfer(recipient, balance);
            }
        }
    }
        
}