"use client";

import { useState } from "react";
import DashboardFooter from "~~/components/shared/admin/DashboardFooter";
import Header from "~~/components/shared/admin/Header";
import SideBar from "~~/components/shared/admin/SideBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white ">
      <div className="flex h-screen gap-1.5 overflow-hidden">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col justify-between flex-1 min-h-screen overflow-x-hidden overflow-y-auto no-scrollbar">
          <section>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="pt-4 pb-6 mx-auto max-w-screen-2xl md:pt-4 md:pb-10 2xl:p-10">
                <section className="w-full px-4 md:px-3">{children}</section>
              </div>
            </main>
          </section>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
