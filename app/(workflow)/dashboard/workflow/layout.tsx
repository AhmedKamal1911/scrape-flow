import { ModeToggle } from "@/components/common/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import Logo from "@/components/common/logo";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2 min-h-14">
        <Logo />
        <ModeToggle />
      </footer>
    </div>
  );
}
