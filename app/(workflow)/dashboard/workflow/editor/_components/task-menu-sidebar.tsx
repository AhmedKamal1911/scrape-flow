"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NodeTaskType } from "@/lib/types/nodeTask";
import { cn } from "@/lib/utils";
import { TaskRegistry } from "@/lib/workflow/task/task-registry";
import { ChevronRight, Coins } from "lucide-react";
import React, { DragEvent, useState } from "react";

export default function TaskMenuSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label transition text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm hover:underline"
            >
              <CollapsibleTrigger className="font-bold! text-lg">
                User Interactions
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent defaultValue={""}>
              <SidebarGroupContent className=" flex flex-col gap-3 pt-2">
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.FILL_INPUT} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.ELEMENT_CLICKER} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.NAVIGATE_URL} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.SCROLL_TO_ELEMENT} />
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label transition text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm hover:underline"
            >
              <CollapsibleTrigger className="font-bold! text-lg">
                Data extraction
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className=" flex flex-col gap-3 pt-2">
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.PAGE_TO_HTML} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn
                    taskType={NodeTaskType.EXTRACT_TEXT_FROM_ELEMENT}
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.EXTRACT_DATA_WITH_AI} />
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label transition text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm hover:underline"
            >
              <CollapsibleTrigger className="font-bold! text-lg">
                Timing Controls
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className=" flex flex-col gap-3 pt-2">
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.WAIT_FOR_ELEMENT} />
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label transition text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm hover:underline"
            >
              <CollapsibleTrigger className="font-bold! text-lg">
                Result Delivery
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="flex flex-col gap-3 pt-2">
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.DELIVER_VIA_WEBHOOK} />
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label transition text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm hover:underline"
            >
              <CollapsibleTrigger className="font-bold! text-lg">
                Data storage
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="flex flex-col gap-3 pt-2">
                <SidebarMenuItem>
                  <TaskMenuBtn
                    taskType={NodeTaskType.READ_PROPERTY_FROM_JSON}
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <TaskMenuBtn taskType={NodeTaskType.ADD_PROPERTY_TO_JSON} />
                </SidebarMenuItem>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}

function TaskMenuBtn({ taskType }: { taskType: NodeTaskType }) {
  const [isDragging, setIsDragging] = useState(false);
  const task = TaskRegistry[taskType];

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("application/nodesFlow", taskType);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const onDragEnd = () => setIsDragging(false);
  return (
    <Button
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      variant="secondary"
      className={cn(
        "justify-between w-full  pl-0.5 p-2 gap-2 capitalize shadow-md cursor-grab font-semibold text-xs transition-transform duration-150",
        isDragging && "scale-95 opacity-70 cursor-grabbing"
      )}
    >
      <div className="flex gap-2 items-center">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge variant={"secondary"} className="p-0.5">
        <Coins size={10} className="size-5" />
        {task.credits}
      </Badge>
    </Button>
  );
}
