import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  // Get the deployer account
  // const [deployer] = await hre.ethers.getSigners();

  // Deploy Certificate Factory
  const CertificateFactory = await hre.ethers.getContractFactory("certificateFactory");
  const certificateFactory = await CertificateFactory.deploy();
  await certificateFactory.waitForDeployment();

  // Deploy Organisation Factory
  const OrganisationFactory = await hre.ethers.getContractFactory("organisationFactory");
  const organisationFactory = await OrganisationFactory.deploy(await certificateFactory.getAddress());
  await organisationFactory.waitForDeployment();

  // Create Organisation
  // @ts-expect-error - ethers type mismatch with hardhat runtime environment
  const createOrgTx = await organisationFactory.createorganisation("EDUMATE", "CLASS I", "http://test.org", "DANIEL");
  const createOrgReceipt = await createOrgTx.wait();

  // Extract organisation addresses from events or transaction receipt
  // Note: You might need to adjust this based on your exact contract's event structure
  const Organisation = createOrgReceipt.logs.find(
    (log: any) => log.fragment && log.fragment.name === "OrganisationCreated",
  )?.args[0];

  const OrganisationNft = createOrgReceipt.logs.find(
    (log: any) => log.fragment && log.fragment.name === "OrganisationNFTCreated",
  )?.args[0];

  // Write addresses to file
  writeAddressesToFile([
    { address: await organisationFactory.getAddress(), name: "Organisation Factory" },
    { address: Organisation, name: "Organisation Address" },
    { address: OrganisationNft, name: "Organisation NFT Address" },
  ]);

  console.log("Deployment completed successfully!");
}

function writeAddressesToFile(addresses: any) {
  const filename = path.join(__dirname, "deployed_contracts2.txt");

  const content = addresses
    .map(
      (item: any) =>
        `-------------------------------------------------
${item.name}
${item.address}
-------------------------------------------------`,
    )
    .join("\n");

  fs.writeFileSync(filename, content);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
