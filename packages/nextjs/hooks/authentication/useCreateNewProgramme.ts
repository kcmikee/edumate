"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useScaffoldWriteContract } from "../scaffold-eth";
import toast from "react-hot-toast";
import { type BaseError, useWaitForTransactionReceipt } from "wagmi";

/* eslint-disable react-hooks/exhaustive-deps */

const useCreateNewProgramme = (
  newOrganisationName: string,
  newProgrammeName: string,
  newImageURI: string,
  newAdminName: string,
) => {
  const router = useRouter();
  const [isWriting, setIsWriting] = useState(false);

  const { data: hash, error, writeContract, isSuccess } = useScaffoldWriteContract("EdumateFactory");
  // const { data: hash, error, writeContract } = useWriteContract();

  const createProgramme = useCallback(() => {
    setIsWriting(true);
    writeContract({
      functionName: "createorganisation",
      args: [newOrganisationName, newProgrammeName, newImageURI, newAdminName],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrganisationName, newProgrammeName, newImageURI, newAdminName]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const toastId = "createNewProgramme";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Programme created successfully !", {
        id: toastId,
        position: "top-right",
      });
      router.push("/enrolled");
      setIsWriting(false);
    }

    if (error) {
      console.log(error.message);
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
      setIsWriting(false);
    }
  }, [isConfirmed, router, error, isConfirming]);

  return {
    createProgramme,
    isWriting,
    isConfirming,
    isSuccess,
  };
};

export default useCreateNewProgramme;
