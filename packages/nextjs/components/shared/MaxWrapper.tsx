import React, { FC } from "react";
import { cn } from "~~/lib/utils";

type MaxWrapperTypes = {
  children: React.ReactNode;
  className?: string;
};

const MaxWrapper: FC<MaxWrapperTypes> = ({ children, className }) => {
  return <div className={cn("w-full mx-auto max-w-[1368px] px-4", className)}>{children}</div>;
};

export default MaxWrapper;
