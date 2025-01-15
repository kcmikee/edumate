/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";
import { getLocalStorage } from "~~/utils/localStorage";

const useGetListOfMentors = () => {
  const [list, setList] = useState<any[]>([]);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contract_address = getLocalStorage("active_organisation");

  const {
    data: listOfMentors,
    error: listOfMentorsError,

    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listMentors",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchMmentorsDetails = useCallback(async () => {
    if (!listOfMentors) return;

    try {
      const formattedRes = listOfMentors.map((address: any) => address.toString());

      const data = formattedRes.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const name = await contract.getMentorsName(address);
        return {
          name,
          address,
        };
      });
      const results = await Promise.all(data);
      setList(results);
    } catch (error) {
      console.error(error);
    }
  }, [listOfMentors?.length]);

  useEffect(() => {
    fetchMmentorsDetails();
  }, [fetchMmentorsDetails]);

  useEffect(() => {
    if (listOfMentorsError) {
      toast.error(listOfMentorsError.message, {
        position: "top-right",
      });
    }
  }, [listOfMentorsError]);

  return list;
};

export default useGetListOfMentors;
