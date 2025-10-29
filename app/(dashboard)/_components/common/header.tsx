import { ModeToggle } from "@/components/common/mode-toggle";
import HeaderBreadcrumb from "./header-breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-muted">
      <div className="flex max-[300px]:flex-col gap-3 items-center justify-between  py-2 min-h-[50px] container">
        <div className="flex items-center gap-3">
          <SidebarTrigger
            variant={"ghost"}
            className="md:hidden"
            size={"icon"}
          />
          <HeaderBreadcrumb />
        </div>
        <div className="flex  items-center gap-3">
          <ModeToggle />
          <UserButton
            userProfileMode="modal"
            appearance={{
              elements: {
                // userButtonOuterIdentifier: "text-accent-foreground order-1",
                userButtonTrigger:
                  "p-1 focus:shadow-md focus-visible:ring-ring/90 focus-visible:ring-[2px]",
                userButtonAvatarBox: "border border-primary size-8",
                userButtonBox: "gap-0.5",
                userButtonPopoverActionButton__signOut: "text-destructive",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
