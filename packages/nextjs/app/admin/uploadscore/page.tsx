// import ScoreUpload from "~~/components/admin/ScoreUpload";
import dynamic from "next/dynamic";

const ScoreUpload = dynamic(() => import("~~/components/admin/ScoreUpload"), { ssr: false });

export default function UploadScores() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <ScoreUpload apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
