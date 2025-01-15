/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useUploadScore = (testId: any, data: any[], apiKey: any, secretKey: any) => {
  const [isWriting, setIsWriting] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const [scoreURI, setScoreURI] = useState("");

  const router = useRouter();

  const toastId = "uploadStudentsScore";

  console.log(scoreURI);

  //getting the contract address of the organisation
  const contract_address = getLocalStorage("active_organisation");

  //Converting the array to json, sending it to IPFS and getting the score URI/CID
  const getJson = useCallback(async () => {
    if (data && data.length > 0) {
      setIsConverting(true);
      try {
        const jsonData = JSON.stringify(data);
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          { pinataContent: jsonData },
          {
            headers: {
              pinata_api_key: apiKey,
              pinata_secret_api_key: secretKey,
            },
          },
        );

        const fileUrl = response.data.IpfsHash;
        const gateWayAndhash = `https://gateway.pinata.cloud/ipfs/${fileUrl}`;
        setScoreURI(gateWayAndhash);
        console.log(gateWayAndhash);

        setIsConverting(false);
        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
        setIsConverting(false);
      }
    } else {
      setIsConverting(false);
      toast.error("No data found", {
        id: toastId,
        position: "top-right",
      });
    }
  }, [data]);

  //sending the testId and scoreURI from pinata to the contract
  const { data: hash, error, writeContract } = useWriteContract();

  const uploadStudentsScore = useCallback(async () => {
    setIsWriting(true);
    const fileUrl = await getJson();
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "RecordResults",
      args: [BigInt(testId.toString()), fileUrl],
    });
  }, [getJson, testId]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConverting) {
      toast.loading("Converting...", {
        id: toastId,
        position: "top-right",
      });
    }
    if (isConfirming) {
      toast.loading("Sending...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      router.push("/admin/viewscores");
      toast.success("Score uploaded successfully !", {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, error, isConfirming, isConverting]);

  return {
    uploadStudentsScore,
    isWriting,
    isConfirming,
    isConfirmed,
  };
};

export default useUploadScore;
