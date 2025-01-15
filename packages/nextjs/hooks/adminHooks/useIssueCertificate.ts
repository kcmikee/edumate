"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useIssueCertificate = (URI: string) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const contract_address = getLocalStorage("active_organisation");

  const issueCertificateToStudents = useCallback(() => {
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "MintCertificate",
      args: [URI],
    });
  }, [URI]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "issueCertificateToStudents";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Certificate issued successfully !", {
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
    issueCertificateToStudents,
    isConfirming,
    isConfirmed,
  };
};

export default useIssueCertificate;
