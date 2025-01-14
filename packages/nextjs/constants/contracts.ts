import { OrganisationABI } from "./abi/OrganisationABI";
import { OrganisationFactoryABI } from "./abi/OrganisationFactoryABI";
import { OrganisationNFTABI } from "./abi/OrganisationNFTABI";
import { ethers } from "ethers";

export const getOrgFactoryContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(
    `${process.env.NEXT_PUBLIC_ORG_FACTORY_CONTRACT}`,
    OrganisationFactoryABI,
    providerOrSigner,
  );
};

export const getOrgContract = (providerOrSigner: ethers.Provider | ethers.Signer, contractAddress: string) => {
  return new ethers.Contract(contractAddress, OrganisationABI, providerOrSigner);
};

export const getOrgNFTContract = (providerOrSigner: ethers.Provider | ethers.Signer) => {
  return new ethers.Contract(`${process.env.NEXT_PUBLIC_ORG_NFT_CONTRACT}`, OrganisationNFTABI, providerOrSigner);
};
