"use client";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SaveEditBtn from "./save-edit-btn";
import ExecuteWorkflowBtn from "./execute-workflow-btn";
import NavigationTabs from "./navigation-tabs";

export default function WorkflowTopbar({
  title,
  subTitle,
  workflowId,
  hideButtons = false,
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
  hideButtons?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header
      className={`flex justify-between items-center gap-2 p-2 min-h-[70px] bg-background border-b border-accent sticky top-0 z-50 ${
        hideButtons ? "max-[400px]:flex-col" : "max-lg:flex-col"
      }  max-lg:gap-4 shadow-sm`}
    >
      <div className="flex gap-5">
        <TooltipWrapper content="Back">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => {
              if (pathname.includes("/runs")) {
                router.push(`/dashboard/workflow/editor/${workflowId}`);
              } else {
                router.push("/dashboard/workflows");
              }
            }}
          >
            <ChevronLeft className="size-7" />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold truncate capitalize">{title}</p>
          {subTitle && (
            <span className="text-xs text-muted-foreground truncate">
              {subTitle}
            </span>
          )}
        </div>
      </div>
      <NavigationTabs workflowId={workflowId} />
      {!hideButtons && (
        <div className="flex items-center gap-3 max-[300px]:self-center">
          <ExecuteWorkflowBtn workflowId={workflowId} />
          <SaveEditBtn workflowId={workflowId} />
        </div>
      )}
    </header>
  );
}
