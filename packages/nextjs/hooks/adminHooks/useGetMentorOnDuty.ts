import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getOrgContract } from "~~/constants/contracts";
import { readOnlyProvider } from "~~/constants/provider";

const useGetMentorOnDuty = () => {
  const [mentorOnDuty, setMentorOnDuty] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const {
    data: mentor,
    error: mentorError,
    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getMentorOnDuty",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchMentorName = useCallback(async () => {
    if (!mentor) return;

    try {
      const formattedRes = mentor.toString();

      const contract = getOrgContract(readOnlyProvider, contract_address);
      const name = await contract.getMentorsName(formattedRes);

      setMentorOnDuty(name);
    } catch (error) {
      console.error(error);
    }
  }, [mentor, contract_address]);

  useEffect(() => {
    fetchMentorName();
  }, [fetchMentorName]);

  useEffect(() => {
    if (mentorError) {
      toast.error(mentorError.message, {
        position: "top-right",
      });
    }
  }, [mentorError]);

  return mentorOnDuty;
};

export default useGetMentorOnDuty;
