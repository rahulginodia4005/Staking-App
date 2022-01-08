import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3'
import Tether from '../truffle_abis/Tether.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'


class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else{
            window.alert('No ethereum brownser detected! You can check out your Metamask')
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()
        console.log(account[0])

        // load Tether contract 
        const tetherData = Tether.networks[networkId]
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether: tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
            console.log('tetherBalance: ', tetherBalance)
        }
        else{
            window.alert('Tether contract not deployed becuase no network detected')
        }

        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd: rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance})
            console.log('rwdBalance: ', rwdBalance)
        }
        else{
            window.alert('RWD contract not deployed becuase no network detected')
            
        }

        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank: decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance})
            console.log('stakingBalance: ', stakingBalance)
        }
        else{
            window.alert('DecentralBank contract not deployed becuase no network detected')
            
        }


    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true 
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className = 'text-center' style={{color:'green',
                fontSize:'120px'}}>
                    <h1></h1>
                </div>
            </div>
        )
    }
}

export default App;