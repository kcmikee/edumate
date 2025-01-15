"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { GrServices } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdEventSeat } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { sideLinks } from "~~/utils/Sidebar";

const SideBar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const pathname = usePathname();

  const handleCloseSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const toggleScroll = () => {
      document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    };
    toggleScroll();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const renderIcons = useCallback((element: number) => {
    switch (element) {
      case 0:
        return <RxDashboard />;
      case 1:
        return <GrServices />;
      case 2:
        return <BiMoneyWithdraw />;
      case 3:
        return <MdEventSeat />;
      case 4:
        return <FiSettings />;
      default:
        return "";
    }
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute font-barlow left-0 top-0 z-[9999] flex h-screen w-72 flex-col overflow-y-hidden bg-eduBlack duration-300 ease-linear lg:static lg:translate-x-0 lg:rounded-lg ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col gap-2 font-barlow px-6 py-8 lg:py-6.5">
        <div className="flex items-start justify-between gap-2 ">
          <Link href={`/user`} className="flex items-end">
            <span className="font-semibold text-gray-200 md:text-xl">edumate</span>
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block text-white lg:hidden"
          >
            <IoIosArrowRoundBack className="text-2xl" />
          </button>
        </div>
        <h1 className="ml-2 text-sm text-gray-200 uppercase">Welcome Back</h1>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 pb-4 mt-3 lg:mt-3 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="font-barlow flex flex-col gap-1.5">
              {/* <!-- Menu Item Calendar --> */}
              {sideLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 text-gray-300 duration-300 ease-in-out before:absolute before:left-0 before:top-0 before:w-0.5 before:transition-all before:duration-200  before:bg-color1 hover:before:h-full hover:text-white/95 ${
                      pathname === link.href ? "before:h-full" : "before:h-0"
                    }`}
                    onClick={handleCloseSideBar}
                  >
                    {renderIcons(index)}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- Sidebar Footer --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SideBar;
