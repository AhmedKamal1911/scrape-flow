import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { FlowNodeData } from "@/lib/types/flowNode";
import { TaskRegistry } from "@/lib/workflow/task/task-registry";
import NodeInputsContainer, { NodeInput } from "./node-inputs-container";

export const CustomNode = memo(function CustomNode(props: NodeProps) {
  const nodeData = props.data as FlowNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputsContainer>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} />
        ))}
      </NodeInputsContainer>
    </NodeCard>
  );
});
