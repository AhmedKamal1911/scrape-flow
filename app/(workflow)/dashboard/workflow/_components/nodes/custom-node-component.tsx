import { NodeProps } from "@xyflow/react";
import React, { memo } from "react";
import NodeCard from "./node-card";
import NodeHeader from "./node-header";
import { FlowNodeData } from "@/lib/types/flowNode";
import { TaskRegistry } from "@/lib/workflow/task/task-registry";
import NodeInputsContainer, { NodeInput } from "./inputs/node-inputs-container";
import NodeOutputsContainer, {
  NodeOutput,
} from "./outputs/node-outputs-container";

export const CustomNodeComponent = memo(function CustomNode(props: NodeProps) {
  const nodeData = props.data as FlowNodeData;
  const task = TaskRegistry[nodeData.type];
  console.log({ task });
  return (
    <NodeCard nodeId={props.id} isSelected={props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputsContainer>
        {task.inputs.map((input) => (
          <NodeInput nodeId={props.id} key={input.name} input={input} />
        ))}
      </NodeInputsContainer>
      <NodeOutputsContainer>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} />
        ))}
      </NodeOutputsContainer>
    </NodeCard>
  );
});
