import Logo from "@/components/common/logo";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      <Logo />
      {children}
    </div>
  );
}
