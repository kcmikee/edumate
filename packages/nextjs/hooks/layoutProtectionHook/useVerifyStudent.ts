import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useReadContract } from "wagmi";
import { OrganisationABI } from "~~/constants/abi/OrganisationABI";

const useVerifyStudent = (_userAddress: any) => {
  const [isStudent, setIsStudent] = useState<boolean>(true);

  const active_organisation = window.localStorage?.getItem("active_organisation");
  const contract_address = JSON.parse(active_organisation as `0x${string}`);

  const { data: studentStatus, error: studentStatusError } = useReadContract({
    address: contract_address,
    abi: OrganisationABI,
    functionName: "VerifyStudent",
    args: [_userAddress],
  });

  const fetchStudentStatus = useCallback(async () => {
    if (!studentStatus) return;
    setIsStudent(studentStatus.toString() === "true");
  }, [studentStatus]);

  useEffect(() => {
    fetchStudentStatus();
  }, [fetchStudentStatus]);

  useEffect(() => {
    if (studentStatusError) {
      toast.error(studentStatusError.message, {
        position: "top-right",
      });
    }
  }, [studentStatusError]);

  return isStudent;
};

export default useVerifyStudent;
