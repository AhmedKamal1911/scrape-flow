"use client";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveEditBtn from "./save-edit-btn";

export default function WorkflowTopbar({
  title,
  subTitle,
  workflowId,
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
}) {
  const router = useRouter();
  return (
    <header className="flex justify-between items-center max-[300px]:flex-col gap-2 p-2 min-[300px]:h-[70px] bg-background border-b-2 border-separate sticky top-0 ">
      <div className="flex gap-5">
        <TooltipWrapper content="Back">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft className="size-8" />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate capitalize">{title}</p>
          {subTitle && (
            <span className="text-sm text-muted-foreground text-ellipsis truncate">
              {subTitle}
            </span>
          )}
        </div>
      </div>

      <div className="max-[300px]:self-center">
        <SaveEditBtn workflowId={workflowId} />
      </div>
    </header>
  );
}
