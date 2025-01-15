"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FaFileSignature } from "react-icons/fa6";
import { GiPieChart } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { TbAlarmAverage, TbArrowRotaryLastLeft } from "react-icons/tb";
import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader } from "~~/components/ui/card";
import useGetAttendanceRatio from "~~/hooks/studentHooks/useGetAttendanceRatio";
import useGetSignedAttendanceImages from "~~/hooks/studentHooks/useGetSignedAttendanceImages";
import useGetStudentName from "~~/hooks/studentHooks/useGetStudentName";
import useGetStudentScore from "~~/hooks/studentHooks/useGetStudentScore";

/* eslint-disable @next/next/no-img-element */

interface Statistic {
  title: any;
  value: any;
  icon?: any;
}

const Statistics = () => {
  const { address } = useAccount();
  const studentName = useGetStudentName(address);
  const attendanceRatio = useGetAttendanceRatio(address);
  const { list } = useGetStudentScore(address);

  const totalScore = useMemo(() => list.reduce((sum, lis) => sum + parseFloat(lis.score), 0), [list]);
  const averageScore = useMemo(
    () => (list.length > 0 ? parseFloat((totalScore / list.length).toFixed(1)) : 0),
    [list, totalScore],
  );
  const { signedAttendanceImages, isLoading } = useGetSignedAttendanceImages(address);

  const statistics: Statistic[] = [
    {
      title: "Total Classes",
      value: attendanceRatio.attendanceRatio.totalClasses ? attendanceRatio.attendanceRatio.totalClasses : 0,
      icon: <SiGoogleclassroom />,
    },
    {
      title: "Class attended",
      value: attendanceRatio.attendanceRatio.attendance ? attendanceRatio.attendanceRatio.attendance : 0,
      icon: <FaFileSignature />,
    },
    {
      title: "Class Percentage",
      value:
        attendanceRatio.attendanceRatio.attendance && attendanceRatio.attendanceRatio.totalClasses
          ? `${Math.floor(
              (attendanceRatio.attendanceRatio.attendance / attendanceRatio.attendanceRatio.totalClasses) * 100,
            )}%`
          : 0,
      icon: <GiPieChart />,
    },
    { title: "Average Score", value: averageScore, icon: <TbAlarmAverage /> },
    {
      title: "Total Score",
      value: totalScore,
      icon: <TbArrowRotaryLastLeft />,
    },
  ];

  return (
    <>
      <section className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-eduBlack">Welcome back, {studentName}</h1>
          <p className="text-xs capitalize text-eduBlack">welcome to edumate dashboard</p>
        </div>
      </section>
      <section>
        <h1 className="mb-2 text-eduBlack">Overview</h1>
      </section>
      <section className="grid w-full gap-8 md:grid-cols-3 ">
        <main className="w-full md:col-span-2">
          <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 ">
            {statistics?.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col justify-between w-full h-24 p-2 px-3 transition-all ease-in-out rounded-md shadow-md hover:border hover:border-color2 bg-white/95"
              >
                <h1 className="text-sm font-medium text-gray-700">{stat.title}</h1>
                <div className="flex flex-wrap items-center justify-between w-full md:flex-row-reverse">
                  <div className="flex items-center justify-center w-12 h-12 text-xl text-gray-700 border border-gray-700 rounded-full">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>
          <section className="">
            {isLoading ? (
              <div className="w-full h-[250px] flex justify-center items-center">
                <h1 className="text-lg font-bold text-center md:text-2xl text-color1">Fetching signed attendance...</h1>
              </div>
            ) : isLoading === false && signedAttendanceImages?.length === 0 ? (
              <div className="w-full h-[250px] flex justify-center items-center">
                <h1 className="text-lg font-bold text-center md:text-2xl text-color1">No attendance signed yet</h1>
              </div>
            ) : (
              <section className="grid w-full gap-6 mt-3 lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-4">
                {signedAttendanceImages?.slice(0, 3).map((list, index) => (
                  <>
                    <Link href="/user/attendance" key={index}>
                      <Card
                        key={index}
                        className="transition-all ease-in-out rounded-md shadow-md bg-white/95 hover:border hover:border-color2"
                      >
                        <CardHeader>
                          <h1>{list.topic}</h1>
                          <h3>{list.mentorName}</h3>
                        </CardHeader>
                        <CardContent>
                          <img src={list.imageURI} alt="NFT Image" className="object-cover w-full h-40 rounded-md" />
                          <h1 className="mt-2">Lecture ID: {list.lectureId}</h1>
                        </CardContent>
                      </Card>
                    </Link>
                  </>
                ))}
              </section>
            )}
          </section>
        </main>
      </section>
    </>
  );
};

export default Statistics;
