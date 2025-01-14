"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { FaFileSignature } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { LiaCertificateSolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";
import { SiCodementor, SiGoogleclassroom } from "react-icons/si";
import useChangeProgramStatus from "~~/hooks/adminHooks/useChangeProgramStatus";
import useGetNumericStatistics from "~~/hooks/adminHooks/useGetNumericStatistics";
import useGetProgramStatus from "~~/hooks/adminHooks/useGetProgramStatus";

// const Barchart = dynamic(() => import("./chart/Barchart"), { ssr: false });
const Piechart = dynamic(() => import("./chart/Piechart"), { ssr: false });

const Dashboard = () => {
  const { statsData, isLoading } = useGetNumericStatistics();

  const calculateAttendancePercentage = (data: any) => {
    const attendancePercentage =
      data.totalStudent > 0 && data.totalClass > 0
        ? (data.totalSignedAttendance / (data.totalStudent * data.totalClass)) * 100
        : 0;

    return `${attendancePercentage.toFixed(2)}%`;
  };

  const status = useGetProgramStatus();

  const { toggleProgramStatus, isWriting, isConfirming } = useChangeProgramStatus();

  return (
    <section className="flex flex-col w-full py-6">
      <div className="grid w-full gap-4 lg:grid-cols-6 md:grid-cols-5">
        <main className="flex flex-col gap-4 lg:col-span-6 md:col-span-5">
          <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Admin Dashboard</h1>
              <h4 className="text-lg tracking-wider text-color2">Statistics</h4>

              {/* Guidelines */}
              <div className="flex flex-col w-full mt-2 text-red-600">
                <h5 className="text-sm text-red-600">Guidelines</h5>
                <ol className="text-xs text-red-600 list-decimal list-inside">
                  <li>Here are statistics of the program.</li>
                  <li>
                    You can change the program status from &apos;ongoing&apos; to &apos;ended&apos; and vice versa.
                  </li>
                  <li>Click on the &apos;End Program&apos; button to end the program.</li>
                  <li>Only the organisation creator can change the program status.</li>
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h4 className="text-color2">
                Program Status:{" "}
                <span className={`${status ? "text-green-600" : "text-red-600"}`}>{status ? "Ongoing" : "Ended"}</span>
              </h4>
              <Button
                onClick={() => toggleProgramStatus()}
                disabled={isWriting || isConfirming}
                className={`border-none outline-none rounded px-3 text-gray-200 py-1.5 ${status ? "bg-red-600 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"}`}
              >
                {status ? "End Program" : "Resume Program"}
              </Button>
            </div>
          </div>

          <article className="grid w-full gap-3 md:grid-cols-3">
            {/* one */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Total Classes</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <SiGoogleclassroom />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{isLoading ? 0 : statsData?.totalClass}</h3>
              </div>
            </div>
            {/* two */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Total Students</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <PiStudentFill />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{isLoading ? 0 : statsData.totalStudent}</h3>
              </div>
            </div>
            {/* three */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Total Mentors</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <SiCodementor />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{isLoading ? 0 : statsData.totalMentors}</h3>
              </div>
            </div>
            {/* four */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Total Attendence Signed</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <FaFileSignature />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {isLoading ? 0 : statsData.totalSignedAttendance}
                </h3>
              </div>
            </div>
            {/* five */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Attendence (%)</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <GiPieChart />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {isLoading ? 0 : calculateAttendancePercentage(statsData)}
                </h3>
              </div>
            </div>
            {/* six */}
            <div className="flex flex-col w-full gap-4 p-3 bg-white rounded-md">
              <h1 className="text-sm font-medium text-gray-700">Total Certification</h1>
              <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                  <LiaCertificateSolid />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {isLoading ? (
                    0
                  ) : (
                    <span>
                      {statsData.totalCertification
                        ? statsData.totalStudent
                        : statsData.totalCertification === undefined
                          ? 0
                          : 0}
                    </span>
                  )}
                </h3>
              </div>
            </div>
          </article>
        </main>
      </div>

      {/* Charts */}
      <div className="grid w-full gap-5 mt-8 lg:grid-cols-6 md:grid-cols-5 md:gap-3 lg:gap-5">
        <main className="flex flex-col w-full p-3 lg:col-span-4 md:col-span-3">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-xl font-bold uppercase text-color2 md:text-lg">Programme Analysis</h1>
            <h4 className="text-base tracking-wider text-color2">Class, Students and Mentors Statistics</h4>
          </div>
          {/* pie */}
          <Piechart />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
