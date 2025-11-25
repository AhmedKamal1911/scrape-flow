import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Calendar, CircleDashed } from "lucide-react";
import { ExecutionWithPhases } from "./execution-viewer";

export default function ExecutionDetailsSidebar({
  execution,
  ...props
}: React.ComponentProps<typeof Sidebar> & { execution: ExecutionWithPhases }) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="pt-[70px] bg-blue-900 ">
        <div className="py-4 px-2">
          <div className="flex justify-between items-center py-2 px-4 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <CircleDashed size={20} className="stroke-muted-foreground.80" />
              <span>Status</span>
            </div>
            <div className="font-semibold capitalize flex gap-2 items-center">
              {execution?.status}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 px-4 text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <Calendar size={20} className="stroke-muted-foreground/80" />
            <span>Started at</span>
          </div>
          <div>{execution?.startedAt ? new Date().getDate() : "-"}</div>
          {/* TODO: add formate distance to now fn from date-fns */}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
