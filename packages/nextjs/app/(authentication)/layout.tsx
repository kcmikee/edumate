import React from "react";
import NavHeader from "~~/components/ui/onboardingNav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-start justify-between px-10 py-4">
      <NavHeader />
      {children}
    </div>
  );
};

export default AuthLayout;
