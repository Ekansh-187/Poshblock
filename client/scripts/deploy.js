const { ethers } = require("hardhat");

async function main() {
  const Poshblock = await ethers.deployContract("Poshblock");

  await Poshblock.waitForDeployment();

  console.log("SimpleStorage Contract Address:", Poshblock.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
