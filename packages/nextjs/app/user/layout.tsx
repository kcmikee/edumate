"use client";

import { useState } from "react";
import DashboardFooter from "~~/components/shared/user/DashboardFooter";
import Header from "~~/components/shared/user/Header";
import SideBar from "~~/components/shared/user/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" bg-white lg:p-1.5">
      {/* Page Wrapper Start  */}
      <div className="flex h-screen gap-1.5 overflow-hidden">
        {/* Sidebar Start */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Sidebar End  */}

        {/* Content Area Start  */}
        <div className="relative flex flex-col justify-between flex-1 min-h-screen overflow-x-hidden overflow-y-auto no-scrollbar">
          <section>
            {/*  Header Start */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/*  Header End */}

            {/*  Main Content Start */}
            <main>
              <div className="pt-4 pb-6 mx-auto max-w-screen-2xl md:pt-4 md:pb-10 2xl:p-10">
                <section className="w-full px-1.5">{children}</section>
              </div>
            </main>
          </section>
          {/*  Main Content End  */}
          <DashboardFooter />
        </div>
        {/*  Content Area End  */}
      </div>
      {/*  Page Wrapper End  */}
    </div>
  );
}
