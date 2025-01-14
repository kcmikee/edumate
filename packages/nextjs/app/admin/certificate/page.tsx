import IssueCertifcate from "~~/components/admin/IssueCertifcate";

export default function Certificate() {
  const apiKey = process.env.PINATA_API_KEY;
  const secretKey = process.env.PINATA_SECRET_API_KEY;
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <IssueCertifcate apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
