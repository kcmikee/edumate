import dynamic from "next/dynamic";

// import IssueSpok from "~~/components/admin/IssueSpok";

const IssueSpok = dynamic(() => import("~~/components/admin/IssueSpok"), { ssr: false });

export default function SingleProofOfKnowledge() {
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <IssueSpok apiKey={apiKey} secretKey={secretKey} />
    </main>
  );
}
