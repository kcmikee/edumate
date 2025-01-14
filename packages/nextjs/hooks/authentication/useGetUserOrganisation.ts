"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useScaffoldReadContract } from "../scaffold-eth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBlockNumber } from "wagmi";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";

const useGetUserOrganisations = (_userAddress: any) => {
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: listOfOrganisations,
    error: listOfOrganisationsError,
    queryKey,
  } = useScaffoldReadContract({
    contractName: "EdumateFactory",
    functionName: "getUserOrganisatons",
    args: [_userAddress],
  });

  // console.log(listOfOrganisations, listOfOrganisationsError, listOfOrganisationsIsPending);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchUserOrganisations = useCallback(async () => {
    if (!listOfOrganisations) return;

    try {
      const formattedRes = listOfOrganisations.map((address: any) => address.toString());
      const data = formattedRes.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, address);

        const name = await contract.getOrganizationName();
        const cohort = await contract.getCohortName();
        const moderator = await contract.getModerator();
        const imageURI = await contract.getOrganisationImageUri();
        const status = await contract.getOrganizationStatus();
        const isMentor = await contract.VerifyMentor(_userAddress);
        const isStudent = await contract.VerifyStudent(_userAddress);
        return {
          address,
          name,
          cohort,
          moderator,
          imageURI,
          status,
          isMentor,
          isStudent,
        };
      });
      const results = await Promise.all(data);

      if (typeof window !== "undefined") {
        localStorage.setItem("memberOrganisations", JSON.stringify(results));
      }
      setIsLoading(false);
      setList(results);
    } catch (error) {
      console.error(error);
    }
  }, [listOfOrganisations?.length]);

  useEffect(() => {
    fetchUserOrganisations();
  }, [fetchUserOrganisations]);

  useEffect(() => {
    if (listOfOrganisationsError) {
      console.log(listOfOrganisationsError.shortMessage);
      toast.error(listOfOrganisationsError.shortMessage, { position: "top-right" });
    }
  }, [listOfOrganisationsError]);

  return { list, isLoading };
};

export default useGetUserOrganisations;
