"use client";

/* eslint-disable @next/next/no-img-element */

export const WalletConnected = ({ address, icon }: { address: string | undefined; icon?: string | undefined }) => {
  const SUPPORTED_CHAIN_ID = 11155111;
  const formatAddress = (address: string | undefined) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const selectedNetworkId = SUPPORTED_CHAIN_ID;

  return (
    <span className="flex items-center gap-1">
      {Number(selectedNetworkId) !== SUPPORTED_CHAIN_ID ? (
        <span className="text-sm">Switch to Base Mainnet</span>
      ) : (
        <>
          {icon && (
            <span className="w-6 h-6 overflow-hidden rounded-full">
              <img src={icon} alt="Icon" className="object-cover w-full h-full" />
            </span>
          )}
          <span>{formatAddress(address)}</span>
        </>
      )}
    </span>
  );
};
