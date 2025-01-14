"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import useTransferOwnership from "~~/hooks/adminHooks/useTransferOwnership";

const TransferOwnership = () => {
  const [newModerator, setNewModerator] = useState("");

  const { isConnected } = useAccount();

  const { transferOwner, isConfirming, isConfirmed } = useTransferOwnership(newModerator);

  const handleOwnershipTransfer = async (e: FormEvent) => {
    e.preventDefault();

    if (!isConnected) return toast.error("Please connect wallet", { position: "top-right" });

    if (newModerator === "") return toast.error("Please enter new moderator address", { position: "top-right" });

    transferOwner();

    if (isConfirmed) setNewModerator("");
  };
  return (
    <section className="flex flex-col w-full py-6">
      <main className="flex flex-col w-full gap-7">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold uppercase text-color2 md:text-2xl">Ownership Transfer</h1>
          <h4 className="text-lg tracking-wider text-color2">Are you sure you want to transfer ownership?</h4>

          {/* Guidelines */}
          <div className="flex flex-col w-full mt-4 text-red-600">
            <h5 className="text-sm text-red-600">Guidelines</h5>
            <ol className="text-xs text-red-600 list-decimal list-inside">
              <li className="font-semibold uppercase">Ownership transfer is irreversible.</li>
              <li>Only the organisation creator/moderator can transfer ownership.</li>
              <li>Once ownership is transfered, the new owner will be the organisation moderator/creator.</li>
              <li> To transfer ownership, first, enter the address of the new owner.</li>
              <li>Cross-check the address of the new owner.</li>
              <li>Click on the &apos;Transfer&apos; button to transfer ownership.</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-6">
          <form className="lg:w-[50%] md:w-[70%] w-full grid gap-4" onSubmit={handleOwnershipTransfer}>
            <div className="flex flex-col">
              <label htmlFor="newModerator" className="ml-1 font-medium text-color3">
                New Moderator
              </label>
              <input
                type="text"
                name="newModerator"
                id="newModerator"
                placeholder="Enter the new moderator's wallet address"
                className="w-full px-4 py-3 text-sm border rounded-lg outline-none caret-color1 border-color1 bg-color1/5 text-color3"
                value={newModerator}
                onChange={e => setNewModerator(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-3">
              <Button disabled={isConfirming} type="submit" className="bg-color1 hover:bg-color2">
                Transfer
              </Button>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default TransferOwnership;
