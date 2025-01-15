/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";
import { getLocalStorage } from "~~/utils/localStorage";

const useGetListOfStudents = () => {
  const [list, setList] = useState<any[]>([]);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contract_address = getLocalStorage("active_organisation");

  const {
    data: listOfStudents,
    error: listOfStudentsError,

    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "liststudents",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchStudentsDetails = useCallback(async () => {
    if (!listOfStudents) return;

    try {
      const formattedRes = listOfStudents.map((address: any) => address.toString());

      const data = formattedRes.map(async (address: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const name = await contract.getStudentName(address);
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
  }, [listOfStudents?.length]);

  useEffect(() => {
    fetchStudentsDetails();
  }, [fetchStudentsDetails]);

  useEffect(() => {
    if (listOfStudentsError) {
      toast.error(listOfStudentsError.message, {
        position: "top-right",
      });
    }
  }, [listOfStudentsError]);

  return list;
};

export default useGetListOfStudents;
