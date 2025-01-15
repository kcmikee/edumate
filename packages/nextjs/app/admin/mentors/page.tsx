import dynamic from "next/dynamic";

// import MentorLists from "~~/components/admin/MentorLists";

const MentorLists = dynamic(() => import("~~/components/admin/MentorLists"), { ssr: false });

export default function Mentors() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <MentorLists />
    </main>
  );
}
