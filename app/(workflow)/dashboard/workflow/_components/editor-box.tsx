import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowEditor from "./flow-editor";
import WorkflowTopbar from "./workflow-topbar/workflow-topbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import TaskMenuSidebar from "./task-menu-sidebar";
type Props = {
  workflow: Workflow;
};

export default function EditorBox({ workflow }: Props) {
  return (
    <ReactFlowProvider>
      <SidebarProvider>
        <section className="flex size-full">
          <TaskMenuSidebar className="flex-shrink-0" />

          <div className="flex flex-col flex-1">
            <WorkflowTopbar
              title="workflow editor"
              subTitle="edit your workflow here"
              workflowId={workflow.id}
            />

            <div className="flex-1 overflow-auto">
              <FlowEditor workflow={workflow} />
            </div>
          </div>
        </section>
      </SidebarProvider>
    </ReactFlowProvider>
  );
}
