"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useRegisterStudents = (data: any[]) => {
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

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
        position: "top-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, error, isConfirming]);

  return {
    registerStudents,
    isWriting,
    isConfirming,
    isConfirmed,
  };
};

export default useRegisterStudents;
