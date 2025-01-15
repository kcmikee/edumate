// import StudentLists from "~~/components/admin/StudentLists";
import dynamic from "next/dynamic";

const StudentLists = dynamic(() => import("~~/components/admin/StudentLists"), { ssr: false });

export default function Students() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <StudentLists />
    </main>
  );
}
