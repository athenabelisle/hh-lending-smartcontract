//TEST CONDUCTED ON FORKED MAINNET USING HARDHAT

const { getNamedAccounts, ethers } = require("hardhat")
const AMOUNT = ethers.utils.parseEther("0.2")

async function getWeth() {
  const { deployer } = await getNamedAccounts()

  const iWeth = await ethers.getContractAt(
    "IWeth",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //forking on WETH mainnet using hardhat, deployed by deployer
    deployer
  )
  const tx = await iWeth.deposit({ value: AMOUNT })
  await tx.wait(1)
  const wethBalance = await iWeth.balanceOf(deployer)
  console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = {
  getWeth,
  AMOUNT,
}
