"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaucetButton, RainbowKitCustomConnectButton } from "../scaffold-eth";
import { Button } from "../ui/button";
import Logo from "./Logo";
import MaxWrapper from "./MaxWrapper";
import { MobileNavToggler } from "./MobileNavToggler";
import { WalletConnected } from "./WalletConnected";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAccount, useSwitchChain } from "wagmi";
import { cn } from "~~/lib/utils";
import { navLinks } from "~~/utils/NavLinks";

const OnboardingHeader = () => {
  const SUPPORTED_CHAIN_ID = 11155111;
  const { address, isConnected } = useAccount();

  const { switchChain } = useSwitchChain();

  const selectedNetworkId = SUPPORTED_CHAIN_ID;

  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const walletConnect = () => {
    if (!isConnected) {
      open();
    } else if (isConnected && Number(selectedNetworkId) !== SUPPORTED_CHAIN_ID) {
      switchChain({ chainId: SUPPORTED_CHAIN_ID });
    }
  };

  return (
    <header className="w-full">
      <div className="fixed inset-x-0 top-0 z-50 w-full h-20 bg-white shadow-sm lg:px-8 md:px-4">
        <MaxWrapper className="flex items-center justify-between w-full h-full">
          <Logo />

          <div className="items-stretch justify-center hidden h-full md:flex">
            {navLinks.map((link, _key) => (
              <Link
                href={link.href}
                key={_key}
                className={cn(
                  "text-base overflow-hidden relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-color1  before:transition-all before:duration-200 text-color2 before:-z-10  flex justify-center items-center px-6 transition",
                  {
                    "before:h-full text-white": link.href == pathname,
                    "hover:before:h-full hover:text-white": link.href != pathname,
                  },
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center gap-4">
              <RainbowKitCustomConnectButton />
              <FaucetButton />
            </div>

            <div className="md:hidden">
              <MobileNavToggler />
            </div>
          </div>
        </MaxWrapper>
      </div>
      <motion.div className="fixed top-20 left-0 right-0 bg-color1 origin-[0%] h-[5px] z-[42]" style={{ scaleX }} />
    </header>
  );
};

export default OnboardingHeader;
