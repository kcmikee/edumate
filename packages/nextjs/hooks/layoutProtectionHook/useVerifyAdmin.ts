import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";
import { getLocalStorage } from "~~/utils/localStorage";

const useVerifyAdmin = (_userAddress: any) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  const contract_address = getLocalStorage("active_organisation");

  const { data: adminStatus, error: adminStatusError } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "VerifyMentor",
    args: [_userAddress],
  });

  const fetchAdminStatus = useCallback(async () => {
    if (!adminStatus) return;
    setIsAdmin(adminStatus.toString() === "true");
  }, [adminStatus]);

  useEffect(() => {
    fetchAdminStatus();
  }, [fetchAdminStatus]);

  useEffect(() => {
    if (adminStatusError) {
      toast.error(adminStatusError.message, {
        position: "top-right",
      });
    }
  }, [adminStatusError]);

  return isAdmin;
};

export default useVerifyAdmin;
