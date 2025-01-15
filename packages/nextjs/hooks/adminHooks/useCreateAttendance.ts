"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useCreateAttendance = (_lectureId: string, _uri: string, _topic: string) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const contract_address = getLocalStorage("active_organisation");

  const createAttendance = useCallback(() => {
    const lectureIdBytes: any = ethers.encodeBytes32String(_lectureId);
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "createAttendance",
      args: [lectureIdBytes, _uri, _topic],
    });
  }, [_lectureId, _uri, _topic]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "createAttendance";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Attendance created", {
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
    createAttendance,
    isConfirming,
    isConfirmed,
  };
};

export default useCreateAttendance;
