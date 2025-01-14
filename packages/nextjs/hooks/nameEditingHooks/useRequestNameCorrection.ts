/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useRequestNameCorrection = () => {
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const requestNameCorrection = useCallback(() => {
    setIsWriting(true);
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "RequestNameCorrection",
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "requestNameCorrection";

  useEffect(() => {
    if (isConfirming) {
      toast.success("Processing", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Name Correction Requested", {
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
  }, [isConfirming, isConfirmed, error]);

  return {
    requestNameCorrection,
    isWriting,
    isConfirming,
  };
};
export default useRequestNameCorrection;
