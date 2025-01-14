import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();

  // Load the private key from environment variable
  const deployerPrivateKey = process.env.PRIVATE_KEY;
  if (!deployerPrivateKey) {
    throw new Error("Please set the PRIVATE_KEY environment variable");
  }

  // Addresses
  const childContractAddress = "0xE67D3ceb8e2B07A0524E02c25F725CF85c94Cd82";

  // Create student object
  const student1 = {
    _address: "0x7379ec8392c7684cecd0550A688D729717EBBB01",
    _name: "SAMUEL",
  };

  const students = [student1];

  // Load the ICHILD contract
  const ChildContract = await hre.ethers.getContractFactory("ICHILD");
  const childContract = ChildContract.attach(childContractAddress);

  // Register students
  try {
    const tx = await childContract.connect(deployer).registerStudents(students);
    await tx.wait();

    console.log("Students registered successfully");

    // Write address to file (similar to Foundry's writeAddressesToFile)
    writeAddressesToFile(childContractAddress, "Child Contract Address");
  } catch (error) {
    console.error("Error registering students:", error);
  }
}

function writeAddressesToFile(addr: any, text: any) {
  const filename = path.join(__dirname, "deployed_contracts.txt");
  const content = `
-------------------------------------------------
${text}
${addr}
-------------------------------------------------
`;

  fs.appendFileSync(filename, content);
  console.log(`Address written to ${filename}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
