import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useListClassesAttended = (student_address: any) => {
  const queryClient = useQueryClient();
  const [classesAttended, setClassesAttended] = useState<number[]>([]);

  const contract_address = getLocalStorage("active_organisation");

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: classesAttendedData,
    error: classesAttendedError,
    isPending: classesAttendedIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listClassesAttended",
    args: [student_address],
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey]);

  const fetchClassesAttended = useCallback(() => {
    if (classesAttendedData) {
      setClassesAttended(classesAttendedData.map((item: `0x${string}`) => Number(BigInt(item))));
    }
  }, [classesAttendedData]);

  useEffect(() => {
    fetchClassesAttended();
  }, [classesAttendedData, fetchClassesAttended]);

  return {
    classesAttended,
    isPending: classesAttendedIsPending,
    error: classesAttendedError,
  };
};

export default useListClassesAttended;
