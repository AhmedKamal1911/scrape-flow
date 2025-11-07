import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowEditor from "./flow-editor";
type Props = {
  workflow: Workflow;
};

export default function EditorBox({ workflow }: Props) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col size-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}
