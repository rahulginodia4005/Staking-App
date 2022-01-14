import React, {Component} from "react";

class Airdrop extends Component {

    constructor() {
        super()
        this.state ={
            time: {},
            seconds: 5
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if(this.timer == 0 && this.state.seconds > 0){
            this.timer = setInterval(this.countDown, 1000) //it will call this.countDown every 1000miliseconds i.e. every 1 second until clearInterval is called
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds : seconds,
            time: this.secondsToTime(seconds)
        })
        if(seconds==0){
            
            clearInterval(this.timer)
        }
    }

    secondsToTime(secs) {
        let hours, minutes, seconds
        hours = Math.floor(secs/3600);
        secs = secs - (hours*3600)
        minutes = Math.floor((secs)/60);
        secs = secs - (minutes*60);
        seconds = secs;

        let obj = {
            'h' : hours,
            'm' : minutes,
            's' : seconds
        }
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({time : timeLeftVar})
    }

    airdropGiveTokens() {
        let stakingB = this.props.stakingBalance;
        if(stakingB >= window.web3.utils.toWei('50', 'Ether')){
            this.startTimer()
        }
    }
 
    render() {
        return (
            <div style={{color : 'black'}}> 
                {/* {this.props.issueToken()} */}
                {this.state.time.m} : {this.state.time.s}   
                {this.airdropGiveTokens()}     
            </div>
        )
    }
}

export default Airdrop;