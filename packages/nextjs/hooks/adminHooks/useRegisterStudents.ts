"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useRegisterStudents = (data: any[]) => {
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const contract_address = getLocalStorage("active_organisation");

  const registerStudents = useCallback(() => {
    setIsWriting(true);

    const formattedData = data.map(({ address, name }) => ({
      _address: address as `0x${string}`,
      _name: name,
    }));

    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "registerStudents",
      args: [formattedData],
    });
  }, [data]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "registerStudents";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Students registered successfully !", {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "bottom-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, error, isConfirming]);

  console.log(error);

  return {
    registerStudents,
    isWriting,
    isConfirming,
    isConfirmed,
  };
};

export default useRegisterStudents;
