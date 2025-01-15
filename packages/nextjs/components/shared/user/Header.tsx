"use client";

// import { useCallback, useEffect } from "react";
// import { useRouter } from "next/navigation";
import Greeting from "./Greeting";
// import { toast } from "sonner";
import { useAccount } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
// import useVerifyStudent from "~~/hooks/layoutProtectionHook/useVerifyStudent";
import useGetStudentName from "~~/hooks/studentHooks/useGetStudentName";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    address,
    // , isConnected
  } = useAccount();

  // const router = useRouter();

  // const isUserStudent = useVerifyStudent(address);

  // const change = useCallback(async () => {
  //   if (!isConnected) {
  //     router.push("/programme");
  //     return toast.error("Please connect wallet", { position: "top-right" });
  //   } else if (!isUserStudent) {
  //     router.push("/programme");
  //     return toast.error("ACCESS NOT ALLOWED !", { position: "top-right" });
  //   }
  // }, [isConnected, router, isUserStudent]);

  // useEffect(() => {
  //   change();
  // }, [change, isConnected, isUserStudent]);

  const studentName = useGetStudentName(address);

  return (
    <header className="sticky top-0 z-[999] flex w-full lg:rounded-lg">
      <div className="relative flex items-center justify-between flex-grow px-4 py-4 bg-white shadow-md md:px-2 2xl:px-11 before:absolute before:bottom-0 before:left-0 before:w-full before:h-px">
        <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={e => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[9999] block rounded-sm border border-white bg-transparent p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block w-5 h-5 cursor-pointer">
              <span className="absolute right-0 block w-full h-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 w-full h-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="hidden md:block">
          <Greeting name={studentName} />
        </div>

        <div className="flex items-center gap-4">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
