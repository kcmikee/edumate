// import TransferOwnership from "~~/components/admin/TransferOwnership";
import dynamic from "next/dynamic";

const TransferOwnership = dynamic(() => import("~~/components/admin/TransferOwnership"), { ssr: false });

export default function OwnershipTransfer() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <TransferOwnership />
    </main>
  );
}
