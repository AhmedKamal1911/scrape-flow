"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Landmark,
  Layers2Icon,
  LucideIcon,
  LucideProps,
  ShieldCheck,
} from "lucide-react";

import { ForwardRefExoticComponent, RefAttributes } from "react";

import { SidebarNav } from "./sidebar-nav";
import Logo from "@/components/common/logo";

export type Route = {
  href: string;
  label: string;
  icon: LucideIcon;
};
const routes: Route[] = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  { href: "credentials", label: "Credentials", icon: ShieldCheck },
  { href: "billing", label: "Billing", icon: Landmark },
];

export default function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav routes={routes} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
