// import Dashboard from "~~/components/admin/Dashboard";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("~~/components/admin/Dashboard"), { ssr: false });
export default function AdminDashboard() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Dashboard />
    </main>
  );
}
