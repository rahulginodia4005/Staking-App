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
    }

    function depositTokens(uint _amount) public {
        require(_amount>0, 'amount should be greater than zero');
        tether.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]){
            hasStaked[msg.sender] = true;
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;

    }
        
}