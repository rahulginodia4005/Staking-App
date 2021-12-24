const Tether  =  artifacts.require('Tether'); 
const RWD  =  artifacts.require('RWD'); 
const DecentralBank  =  artifacts.require('DecentralBank'); 

require('chai')
.use(require('chai-as-promised'))
.should()

contract ('DecentralBank', ([owner,customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(tether.address, rwd.address)

        await rwd.transfer(decentralBank.address, tokens('1000000'))
        await tether.transfer(customer, tokens('100'), {from : owner})
    })


    describe('Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })
    describe('RWD Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })
    describe('DecentralBank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('reward tokens for staking', async () => {
            let result = await tether.balanceOf(customer);
            assert.equal(result,tokens('100'), 'investor tether balance before staking')

            await tether.approve(decentralBank.address, tokens('100'), {from : customer})
            await decentralBank.depositTokens(tokens('100'), {from : customer})
        })
    })
    
})
