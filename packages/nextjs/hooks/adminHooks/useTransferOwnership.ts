"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useTransferOwnership = (newModerator: any) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const contract_address = getLocalStorage("active_organisation");

  const router = useRouter();

  const transferOwner = useCallback(() => {
    const formatAddress = newModerator as `0x${string}`;
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "TransferOwnership",
      args: [formatAddress],
    });
  }, [newModerator]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "transferOwnership";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Ownership transferred successfully!", {
        id: toastId,
        position: "top-right",
      });
      router.push("/programme");
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
    }
  }, [isConfirming, isConfirmed, error]);

  return {
    transferOwner,
    isConfirming,
    isConfirmed,
  };
};

export default useTransferOwnership;
