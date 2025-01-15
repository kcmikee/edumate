import dynamic from "next/dynamic";

// import SubmitAttendanceID from "~~/components/user/SubmitID";
const SubmitAttendanceID = dynamic(() => import("~~/components/user/SubmitID"), { ssr: false });

export default function SubmitID() {
  return (
    <section>
      <SubmitAttendanceID />
    </section>
  );
}
