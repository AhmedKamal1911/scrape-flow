import { NodeTaskInputType, TaskInputs } from "@/lib/types/nodeTask";
import React, { useCallback } from "react";
import StringInputField from "./inputs/string-input-field";
import { useReactFlow } from "@xyflow/react";
import { FlowNode } from "@/lib/types/flowNode";
import BrowserInstanceInput from "./inputs/browser-instance-input";
import SelectInput from "./inputs/select-input";

export default function NodeInputField({
  input,
  nodeId,
  isConnected,
}: {
  input: TaskInputs;
  nodeId: string;
  isConnected: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as FlowNode;
  const inputValue = node?.data.inputs?.[input.name] ?? "";
  const updateNodeInputValue = useCallback(
    (newInputValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [input.name]: newInputValue,
        },
      });
    },
    [nodeId, input.name, node?.data?.inputs, updateNodeData]
  );

  switch (input.type) {
    case NodeTaskInputType.STRING:
      return (
        <StringInputField
          updateNodeInputValue={updateNodeInputValue}
          inputProps={input}
          inputValue={inputValue}
          disabled={isConnected}
        />
      );

    case NodeTaskInputType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceInput
          updateNodeInputValue={updateNodeInputValue}
          inputProps={input}
          inputValue={inputValue}
        />
      );

    case NodeTaskInputType.SELECT:
      return (
        <SelectInput
          updateNodeInputValue={updateNodeInputValue}
          inputProps={input}
          inputValue={inputValue}
        />
      );

    default:
      return (
        <div className="w-full">
          <p className="text-muted-foreground text-sm">Not Impelementd Yet</p>
        </div>
      );
      break;
  }
}
