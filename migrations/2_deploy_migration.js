const graywolfNFT = artifacts.require("graywolfNFT")
module.exports = async (deployer) => {
  const accounts = await Web3.eth.getAccounts()
  await deployer.deploy(graywolfNFT,'graywolf NFTs','TNT',10,accounts[1])
}