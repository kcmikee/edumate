import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useBlockNumber, useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useGetProgramStatus = () => {
  const [status, setStatus] = useState<boolean>();

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: programStatus,
    error: programStatusError,

    queryKey,
  } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "getOrganizationStatus",
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  const fetchProgramStatus = useCallback(async () => {
    setStatus(programStatus);
  }, [programStatus]);

  useEffect(() => {
    fetchProgramStatus();
  }, [fetchProgramStatus]);

  useEffect(() => {
    if (programStatusError) {
      toast.error(programStatusError.message, {
        position: "top-right",
      });
    }
  }, [programStatusError]);

  return status;
};

export default useGetProgramStatus;
