const Ab  =  artifacts.require('abcd');

module.exports = async function(deployer){
    await deployer.deploy(Ab)
};