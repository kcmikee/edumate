"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useSignAttendance = (_lectureId: string) => {
  const { data: hash, error, writeContract, isPending } = useWriteContract();

  const active_organisation = window.localStorage?.getItem("active_organisation") || "";
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const signAttendance = useCallback(() => {
    const lectureIdBytes: any = ethers.encodeBytes32String(_lectureId);
    console.log(_lectureId, contract_address);
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "signAttendance",
      args: [lectureIdBytes],
    });
  }, [_lectureId]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "signAttendance";

  useEffect(() => {
    if (isConfirming || isPending) {
      toast.success("Signing attendance...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Attendance signed", {
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
  }, [isConfirming, isConfirmed, error]);

  return {
    signAttendance,
    isConfirming,
    isConfirmed,
    isPending,
  };
};

export default useSignAttendance;
