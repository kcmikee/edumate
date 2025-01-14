/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useEditLectureTopic = () => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const editLectureTopic = useCallback(async (id: string, newTopic: string) => {
    const formattedData: any = ethers.encodeBytes32String(id);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "editTopic",
      args: [formattedData, newTopic],
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "editLectureTopic";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Lecture topic updated successfully !", {
        id: toastId,
        position: "top-right",
      });
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
    }
  }, [isConfirmed, error, isConfirming]);

  return {
    editLectureTopic,
    isConfirming,
    isConfirmed,
  };
};

export default useEditLectureTopic;
