import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockNumber, useReadContracts } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";

interface StatsData {
  totalClass: number;
  totalStudent: number;
  totalMentors: number;
  totalSignedAttendance: number;
  totalCertification: boolean | undefined;
}

const useGetNumericStatistics = () => {
  const [statsData, setStatsData] = useState<StatsData>({
    totalClass: 0,
    totalStudent: 0,
    totalMentors: 0,
    totalSignedAttendance: 0,
    totalCertification: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const { data, queryKey } = useReadContracts({
    contracts: [
      {
        address: contract_address,
        abi: OrganisationABI,
        functionName: "getLectureIds",
      },
      {
        address: contract_address,
        abi: OrganisationABI,
        functionName: "liststudents",
      },
      {
        address: contract_address,
        abi: OrganisationABI,
        functionName: "listMentors",
      },
      {
        address: contract_address,
        abi: OrganisationABI,
        functionName: "certificateIssued",
      },
    ],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchAllStats = useCallback(async () => {
    setIsLoading(true);
    if (!data) return;

    const [lectureIds, listOfStudents, listOfMentors, certificateIssued] = data;

    try {
      const formattedLectureIds = lectureIds?.result?.map((id: any) => id.toString());
      const formattedlistOfStudents = listOfStudents?.result?.map((address: any) => address.toString());
      const formattedlistOfMentors = listOfMentors?.result?.map((address: any) => address.toString());

      // Mapping
      const totalClassesAttendedPromises =
        formattedlistOfStudents?.map(async (address: any) => {
          const contract = getOrgContract(readOnlyProvider, contract_address);
          const attendedClasses = await contract.listClassesAttended(address);
          return attendedClasses.length;
        }) ?? [];

      const totalClassesAttended = await Promise.all(totalClassesAttendedPromises);

      const totalAttendance: number = totalClassesAttended.reduce((sum: any, curr: any) => sum + curr, 0);

      const stats = {
        totalClass: formattedLectureIds?.length || 0,
        totalStudent: formattedlistOfStudents?.length || 0,
        totalMentors: formattedlistOfMentors?.length || 0,
        totalSignedAttendance: totalAttendance || 0,
        totalCertification: certificateIssued.result,
      };

      setStatsData(stats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setIsLoading(false);
    }
  }, [data, contract_address]);

  useEffect(() => {
    fetchAllStats();
  }, [fetchAllStats]);

  return { statsData, isLoading };
};

export default useGetNumericStatistics;
