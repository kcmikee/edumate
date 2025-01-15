// import ScoreList from "~~/components/admin/ScoreList";
import dynamic from "next/dynamic";

const ScoreList = dynamic(() => import("~~/components/admin/ScoreList"), { ssr: false });

export default function Scores() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <ScoreList />
    </main>
  );
}
