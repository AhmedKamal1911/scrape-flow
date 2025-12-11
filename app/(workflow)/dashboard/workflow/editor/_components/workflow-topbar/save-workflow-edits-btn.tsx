import { Button } from "@/components/ui/button";
import { updateWorkflowAction } from "@/lib/server/actions/workflows/update-workflow-action";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function SaveWorkflowEditsBtn({
  workflowId,
}: {
  workflowId: string;
}) {
  const { toObject } = useReactFlow();
  console.log({ toObject, workflowId });
  const saveActionMutation = useMutation({
    mutationFn: updateWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow Updated Successfully.", {
        id: "save-workflow-action",
      });
      // TODO: change id of toast to be workflowid
    },
    onError: (e) => {
      toast.error(e.message, { id: "save-workflow-action" });
    },
  });
  console.log({ pending: saveActionMutation.isPending });
  return (
    <Button
      disabled={saveActionMutation.isPending}
      variant={"outline"}
      className="font-semibold"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow Edits...", {
          id: "save-workflow-action",
        });
        saveActionMutation.mutate({
          workflowId: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <Check className="size-5 stroke-primary" />

      {saveActionMutation.isPending ? "Saving..." : "Save"}
    </Button>
  );
}
