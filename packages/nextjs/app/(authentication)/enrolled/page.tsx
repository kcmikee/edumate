import Programmes from "~~/components/programme/Programmes";

export default function ViewProgramme() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <Programmes apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
