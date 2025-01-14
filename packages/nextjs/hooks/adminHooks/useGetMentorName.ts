"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useGetMentorName = (_userAddress: any) => {
  const [mentorName, setMentorName] = useState("");

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: nameOfMentor,
    error: nameOfMentorError,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getMentorsName",
    args: [_userAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchMentorName = useCallback(async () => {
    if (!nameOfMentor) return;
    setMentorName(nameOfMentor.toString());
  }, [nameOfMentor]);

  useEffect(() => {
    fetchMentorName();
  }, [fetchMentorName]);

  useEffect(() => {
    if (nameOfMentorError) {
      toast.error(nameOfMentorError.message, {
        position: "top-right",
      });
    }
  }, [nameOfMentorError]);

  return mentorName;
};

export default useGetMentorName;
