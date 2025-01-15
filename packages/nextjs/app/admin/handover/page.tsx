import dynamic from "next/dynamic";

// import HandOverToMentor from "~~/components/admin/HandOverToMentor";

const HandOverToMentor = dynamic(() => import("~~/components/admin/HandOverToMentor"), { ssr: false });

export default function MentorHandOver() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <HandOverToMentor />
    </main>
  );
}
