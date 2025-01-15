// import Statistics from "~~/components/user/Statistics";
import dynamic from "next/dynamic";

const Statistics = dynamic(() => import("~~/components/user/Statistics"), { ssr: false });

export default function UserDashboard() {
  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Statistics />
    </main>
  );
}
