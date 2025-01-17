import dynamic from "next/dynamic";

// import AttendenceNFT from "~~/components/admin/AttendenceNFT";

const AttendenceNFT = dynamic(() => import("~~/components/admin/AttendenceNFT"), { ssr: false });

export default function Attendence() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <AttendenceNFT apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
