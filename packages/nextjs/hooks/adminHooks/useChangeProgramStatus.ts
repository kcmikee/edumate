import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

/* eslint-disable react-hooks/exhaustive-deps */
const useChangeProgramStatus = () => {
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const toggleProgramStatus = useCallback(() => {
    setIsWriting(true);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "toggleOrganizationStatus",
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "toggleProgramStatus";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Program status updated successfully!", {
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
  }, [isConfirmed, error, isConfirming]);

  return {
    toggleProgramStatus,
    isWriting,
    isConfirming,
  };
};

export default useChangeProgramStatus;
