import Image from "next/image";
import { FaucetButton, RainbowKitCustomConnectButton } from "../scaffold-eth";

const NavHeader = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <div className="flex gap-1 shrink-0">
          <Image src={"/logo.png"} width={20} height={20} alt={"logo"} className="object-contain shrink-0" />
          <p className="font-semibold">edumate</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};

export default NavHeader;
