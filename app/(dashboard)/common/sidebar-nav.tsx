import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "./dashboard-sidebar";

export function SidebarNav({ routes }: { routes: Route[] }) {
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => pathname === route.href || pathname === `/${route.href}`
    ) || routes[0];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.label}>
              <Link
                href={route.href}
                className={buttonVariants({
                  variant:
                    activeRoute.href === route.href ? "default" : "sidebarItem",
                  className: "w-full justify-start font-semibold",
                })}
                onClick={() => {
                  if (isMobile && route.href !== activeRoute.href) {
                    toggleSidebar();
                  }
                }}
              >
                <route.icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
