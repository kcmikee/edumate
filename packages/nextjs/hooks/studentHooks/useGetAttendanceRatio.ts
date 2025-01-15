import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useGetAttendanceRatio = (student_address: any) => {
  const queryClient = useQueryClient();
  const [attendanceRatio, setAttendanceRatio] = useState({
    attendance: 0,
    totalClasses: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const contract_address = getLocalStorage("active_organisation");

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: attendanceRatioData,
    error: attendanceRatioError,
    isPending: attendanceRatioIsPending,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getStudentAttendanceRatio",
    args: [student_address],
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey]);

  const fetchAttendanceRatio = useCallback(() => {
    if (attendanceRatioData) {
      const [attendance, totalClasses] = attendanceRatioData;
      setAttendanceRatio({
        attendance: Number(attendance),
        totalClasses: Number(totalClasses),
      });
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [attendanceRatioData]);

  useEffect(() => {
    fetchAttendanceRatio();
  }, [attendanceRatioData, fetchAttendanceRatio]);

  return {
    attendanceRatio,
    isLoading,
    isPending: attendanceRatioIsPending,
    error: attendanceRatioError,
  };
};
export default useGetAttendanceRatio;
