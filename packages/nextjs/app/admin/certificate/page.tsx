// import IssueCertifcate from "~~/components/admin/IssueCertifcate";
import dynamic from "next/dynamic";

const IssueCertifcate = dynamic(() => import("~~/components/admin/IssueCertifcate"), { ssr: false });

export default function Certificate() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <IssueCertifcate apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
