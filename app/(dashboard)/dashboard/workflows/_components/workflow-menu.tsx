"use client";
import { useState } from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { MoreVertical, ShuffleIcon, Trash } from "lucide-react";
import Link from "next/link";
import { Workflow } from "@prisma/client";

export default function WorkflowMenu({ workflow }: { workflow: Workflow }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        workflowId={workflow.id}
        workflowName={workflow.name}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
      <DropdownMenu>
        <TooltipWrapper content="Workflow Actions">
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Open menu"
              size="icon"
              className="size-[30px] cursor-pointer"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
        </TooltipWrapper>
        <DropdownMenuContent className="w-36" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem className="min-[400px]:hidden" asChild>
              <Link
                className={"flex items-center gap-2 capitalize"}
                href={`/dashboard/workflow/editor/${workflow.id}`}
              >
                <ShuffleIcon size={16} />
                edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onSelect={() => {
                setOpenDeleteDialog((prev) => !prev);
              }}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
