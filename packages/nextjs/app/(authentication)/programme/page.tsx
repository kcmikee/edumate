import StartProgramme from "~~/components/programme/StartProgramme";

export default function Programme() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <StartProgramme apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
