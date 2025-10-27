import { ThemeSwitcher } from "@/components/common/theme-switcher";
import HeaderBreadcrumb from "./header-breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="flex items-center justify-between  py-4 h-[50px] container">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" variant={"outline"} />
        <HeaderBreadcrumb />
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
