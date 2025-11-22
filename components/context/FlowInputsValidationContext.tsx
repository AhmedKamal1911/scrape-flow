import { FlowNodeMissingInputs } from "@/lib/types/flowNode";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FlowValidationContext = {
  invalidInputs: FlowNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<FlowNodeMissingInputs[]>>;
  clearErrors: () => void;
};

const FlowInputsValidationContext = createContext<FlowValidationContext | null>(
  null
);

export function FlowInputsValidationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [invalidInputs, setInvalidInputs] = useState<FlowNodeMissingInputs[]>(
    []
  );
  const clearErrors = () => {
    setInvalidInputs([]);
  };
  return (
    <FlowInputsValidationContext
      value={{ invalidInputs, clearErrors, setInvalidInputs }}
    >
      {children}
    </FlowInputsValidationContext>
  );
}

export function useFlowValidation() {
  const context = useContext(FlowInputsValidationContext);

  if (!context)
    throw new Error(
      "useFlowValidation must be used within FlowInputsValidationContext"
    );
  return context;
}
