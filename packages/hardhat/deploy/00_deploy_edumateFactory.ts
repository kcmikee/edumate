import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  // const cerficateFactory = "0xEb8957dc1Df6c6d11E58F8909CAb5D7DccED99d4"; //sepolia
  const cerficateFactory = "0x79f8b7f45EAe8De90C5EC785DFCF3a7096210400"; //optimism

  await deploy("EdumateFactory", {
    from: deployer,
    // Contract constructor arguments
    args: [cerficateFactory],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const edumateFactoryContract = await hre.ethers.getContract<Contract>("EdumateFactory", cerficateFactory);
  console.log("edumateFactoryContract deployed to:", await edumateFactoryContract.getAddress());
  console.log("Remember to update the allow list!\n");
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["edumateFactory"];

// deploy at 0xcc64979568dB15Eb171B45779b98350E9E66E565 - sepolia
// deploy at 0x7a9F56B9b049A7Cf026E0C173Cc2C60919c73986 - optimism
