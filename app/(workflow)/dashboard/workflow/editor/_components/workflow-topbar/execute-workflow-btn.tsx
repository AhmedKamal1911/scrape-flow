import useExecutionPlan from "@/hooks/use-execution-plan";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { executeWorkflowAction } from "@/lib/server/actions/workflows/execute-workflow-action";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";
import { useFlowValidation } from "@/components/context/FlowInputsValidationContext";
import { useRouter } from "next/navigation";

export default function ExecuteWorkflowBtn({
  workflowId,
}: {
  workflowId: string;
}) {
  const router = useRouter();
  const generateWorkflow = useExecutionPlan();
  const { invalidInputs } = useFlowValidation();
  const { toObject } = useReactFlow();
  const workflowDefinition = JSON.stringify(toObject());
  const mutation = useMutation({
    mutationFn: executeWorkflowAction,
    onSuccess: (executionId) => {
      toast.success("Execution is Running", { id: "flow-execution" });
      console.log({ executionId });
      router.replace(`/dashboard/workflow/runs/${workflowId}/${executionId}`);
    },
    onError: (error) => {
      toast.error(error.message, { id: "flow-execution" });
      // TODO: handle the network error here
    },
  });
  return (
    <Button
      variant={"outline"}
      className=" capitalize"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generateWorkflow();
        console.log("plan in client", { plan });

        const hasMissingInputs = invalidInputs.length > 0;
        const hasNoPlan = !plan || plan.length === 0; // ← صح
        // TODO: fix the validation when it's changing from invalid to be valid it's shows error and it should not
        if (hasMissingInputs || hasNoPlan) {
          if (hasMissingInputs) {
            toast.error(
              <div>
                <p>Cannot execute workflow. Missing inputs:</p>
                <ul className="ml-4 list-disc">
                  {invalidInputs.map((node, index) => (
                    <li key={index}>[{node.inputs.join(", ")}]</li>
                  ))}
                </ul>
              </div>,
              {
                duration: 8000,
              }
            );
          } else {
            // toast.error(
            //   "Cannot generate workflow plan. Please check your workflow inputs.",
            //   {
            //     duration: 5000,
            //   }
            // );
          }

          return;
        }

        mutation.mutate({
          workflowId,
          flowDefinition: workflowDefinition,
        });
        console.log("---plan --");
        console.table({ plan });
      }}
    >
      <PlayCircle className="text-primary" />
      {mutation.isPending ? "executing..." : "execute"}
    </Button>
  );
}
