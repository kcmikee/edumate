/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useIssueSPOK = (URI: string) => {
  const { data: hash, error, writeContract } = useWriteContract();

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const issueSPOKToMentors = useCallback(() => {
    writeContract({
      address: contract_address,
      abi: OrganisationABI,
      functionName: "mintMentorsSpok",
      args: [URI],
    });
  }, [URI]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "issueSPOKToMentors";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("SPOK issued successfully !", {
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
    issueSPOKToMentors,
    isConfirming,
    isConfirmed,
  };
};

export default useIssueSPOK;
