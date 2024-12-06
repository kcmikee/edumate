import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import NavHeader from "~~/components/ui/nav";

const benefits = [
  {
    image: "/instant.png",
    title: "Instant NFT Attendance Tracking",
    subtext:
      "Authenticate Every Achievement: Our blockchain-powered platform mints unique NFTs for each class attendance, creating immutable, verifiable student records that go beyond traditional tracking.",
  },
  {
    image: "/book.png",
    title: "Transparent Student Management",
    subtext:
      "Total Accountability, Zero Fraud: Real-time, tamper-proof attendance records accessible to students, teachers, and administrators. Trust rebuilt through technology.",
  },
  {
    image: "/admin.png",
    title: "Administrative Efficiency",
    subtext:
      "Automate, Simplify, Optimize: Smart contracts manage attendance, reduce manual work, and provide instant compliance tracking for educational institutions.",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-2">
        <div className="flex flex-col items-start justify-between px-10 py-4">
          <NavHeader />
          <div className="w-11/12 2xl:w-full">
            <h1 className="text-5xl font-bold 2xl:text-7xl">
              Blockchain-Powered Education:
              <span className="inline text-green-700">Transform Learning, Authenticate Achievements.</span>
            </h1>
            <p className="text-lg">
              EduMate turns every classroom moment into a secure, valuable achievement through blockchain technology
            </p>
            <button className="px-4 py-2 text-white rounded-full bg-eduBlack hover:bg-eduBlack/90">
              Join the Educational Revolution - Get Started with EduMate Today!
            </button>
          </div>
          <div className="h-20"></div>
        </div>
        <div className="flex items-center justify-center bg-eduBlack">
          <Image
            src="/edumate-high-resolution-logo-grayscale-transparent.png"
            alt="edu logo"
            height={80}
            width={650}
            className="object-contain"
          />
        </div>
      </div>
      <div className="relative h-[162px] w-full py-[32.56px]">
        <Image src={"/blueBar.png"} fill alt="pattern" className="absolute top-0 z-10" />
        <div className="h-[97px] !w-9/12 mx-auto z-30 relative grid grid-cols-3">
          <div className="flex flex-col items-center justify-center border-r">
            <h4 className="text-5xl font-bold text-white">1</h4>
            <h6 className="text-white">Total Organisations</h6>
          </div>
          <div className="flex flex-col items-center justify-center border-r">
            <h4 className="text-5xl font-bold text-white">10</h4>
            <h6 className="text-white">Total Instructors</h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-5xl font-bold text-white">150+</h4>
            <h6 className="text-white">Total Students</h6>
          </div>
        </div>
      </div>
      <div className="pt-28">
        <h4 className="text-5xl font-bold text-center">
          <span className="inline text-green-700">Why we are best</span> from others?
        </h4>

        <div className="grid w-10/12 grid-cols-3 gap-8 mx-auto mt-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-5 py-8 border rounded-lg border-[#525FE1]/15 hover:bg-white hover:shadow-md transition-colors duration-300 ease-in-out hover:border-white"
            >
              <Image src={benefit.image} alt={benefit.title} height={100} width={100} className="object-contain" />
              <h4 className="text-2xl font-bold text-center">{benefit.title}</h4>
              <p className="mt-0 text-center">{benefit.subtext}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-10">
          <button className="px-4 py-2 text-white rounded-full bg-eduBlack hover:bg-eduBlack/90">
            Join the Educational Revolution - Get Started with EduMate Today!
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
