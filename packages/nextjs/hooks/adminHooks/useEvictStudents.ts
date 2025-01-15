/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useEvictStudents = (data: any[]) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const contract_address = getLocalStorage("active_organisation");

  const evictStudents = useCallback(() => {
    const formattedData = data.map(address => address as `0x${string}`);

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "EvictStudents",
      args: [formattedData],
    });
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "evictStudents";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Students evicted successfully !", {
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
    evictStudents,
    isConfirming,
    isConfirmed,
  };
};

export default useEvictStudents;
