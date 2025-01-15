import dynamic from "next/dynamic";

// import UserAttendenceNFT from "~~/components/user/Attendance";

const UserAttendenceNFT = dynamic(() => import("~~/components/user/Attendance"), { ssr: false });

export default function Attendance() {
  return (
    <>
      <main className="flex flex-col w-full overflow-x-hidden">
        <UserAttendenceNFT />
      </main>
    </>
  );
}
