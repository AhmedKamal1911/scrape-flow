"use client";

import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowEditor from "./flow-editor";
import WorkflowTopbar from "./workflow-topbar/workflow-topbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import TaskMenuSidebar from "./task-menu-sidebar";
import { FlowInputsValidationContextProvider } from "@/components/context/FlowInputsValidationContext";
import { Workflow } from "@prisma/client";

type Props = {
  workflow: Workflow;
};

export default function EditorBox({ workflow }: Props) {
  return (
    <FlowInputsValidationContextProvider>
      <ReactFlowProvider>
        <SidebarProvider>
          <section className="flex size-full">
            <TaskMenuSidebar className="absolute" />

            <div className="flex flex-col min-h-screen w-full">
              <WorkflowTopbar
                title="workflow editor"
                subTitle="Edit your workflow here"
                workflowId={workflow.id}
              />

              <div className="flex-1">
                <FlowEditor workflow={workflow} />
              </div>
            </div>
          </section>
        </SidebarProvider>
      </ReactFlowProvider>
    </FlowInputsValidationContextProvider>
  );
}
