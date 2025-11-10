import { NodeTaskInputType, TaskInput } from "@/lib/types/nodeTask";
import React, { useCallback } from "react";
import StringInputField from "./inputs/string-input-field";
import { useReactFlow } from "@xyflow/react";
import { FlowNode } from "@/lib/types/flowNode";

export default function NodeInputField({
  input,
  nodeId,
}: {
  input: TaskInput;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as FlowNode;
  const inputValue = node?.data.inputs?.[input.name];
  const updateNodeInputValue = useCallback(
    (newInputValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [input.name]: newInputValue,
        },
      });
    },
    [nodeId, input.name, node?.data.inputs, updateNodeData]
  );

  switch (input.type) {
    case NodeTaskInputType.STRING:
      return (
        <StringInputField
          updateNodeInputValue={updateNodeInputValue}
          inputProps={input}
          inputValue={inputValue}
        />
      );
      break;

    default:
      <div className="w-full">
        <p className="">Not Impelementd Yet</p>
      </div>;
      break;
  }
}
