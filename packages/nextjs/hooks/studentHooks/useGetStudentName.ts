"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

type Address = `0x${string}`;

const useGetStudentName = (userAddress: Address) => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [contractAddress, setContractAddress] = useState<Address | null>(null);

  // Safely get contract address from localStorage on client-side only
  useEffect(() => {
    try {
      const activeOrg = localStorage.getItem("active_organisation");
      if (activeOrg) {
        setContractAddress(JSON.parse(activeOrg) as Address);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  const {
    data: studentName,
    error,
    queryKey,
  } = useReadContract({
    // @ts-expect-error - Type 'string | undefined' is not assignable to type 'Address'.
    address: contractAddress,
    abi: OrganisationABI,
    functionName: "getStudentName",
    args: [userAddress],
    query: {
      enabled: Boolean(contractAddress) && Boolean(userAddress),
    },
  });

  // Invalidate query when block number changes
  useEffect(() => {
    if (queryKey) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  }, [error]);

  return studentName?.toString() ?? "";
};

export default useGetStudentName;
