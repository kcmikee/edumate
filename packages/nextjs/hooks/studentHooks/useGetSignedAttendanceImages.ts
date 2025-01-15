/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";
import { getLocalStorage } from "~~/utils/localStorage";

const useGetSignedAttendanceImages = (_studentAddress: any) => {
  const [signedAttendanceImages, setSignedAttendanceImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contract_address = getLocalStorage("active_organisation");

  const {
    data: attendedLectureIds,
    error: attendedLectureIdsError,

    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "listClassesAttended",
    args: [_studentAddress],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchSignedAttendanceImages = useCallback(async () => {
    if (!attendedLectureIds) return;
    if (!contract_address) return;
    try {
      const formattedRes = attendedLectureIds.map((id: any) => id.toString());

      const data = formattedRes.map(async (id: any) => {
        const contract = getOrgContract(readOnlyProvider, contract_address);
        const lectureData = await contract.getLectureData(id);
        const mentorName = await contract.getMentorsName(lectureData[0]);

        return {
          lectureId: ethers.decodeBytes32String(id),
          mentorOnDuty: lectureData[0],
          mentorName: mentorName.toString(),
          topic: lectureData[1],
          imageURI: lectureData[2],
        };
      });
      const results = await Promise.all(data);

      setIsLoading(false);
      setSignedAttendanceImages(results);
    } catch (error) {
      console.error(error);
    }
  }, [attendedLectureIds?.length, attendedLectureIds, contract_address]);

  useEffect(() => {
    fetchSignedAttendanceImages();
  }, [fetchSignedAttendanceImages]);

  useEffect(() => {
    if (attendedLectureIdsError) {
      toast.error(attendedLectureIdsError.message, {
        position: "top-right",
      });
    }
  }, [attendedLectureIdsError]);

  return { signedAttendanceImages, isLoading, fetchSignedAttendanceImages };
};

export default useGetSignedAttendanceImages;
