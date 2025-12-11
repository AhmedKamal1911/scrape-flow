import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { unpublishWorkflowAction } from "@/lib/server/actions/workflows/unpublish-workflow-action";

export default function UnPublishWorkflowBtn({
  workflowId,
}: {
  workflowId: string;
}) {
  const mutation = useMutation({
    mutationFn: unpublishWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow UnPublished Successfully", {
        id: workflowId,
      });
    },
    onError: (error) => {
      toast.error(error.message, { id: workflowId });
      // TODO: handle the network error here
    },
  });
  return (
    <Button
      variant={"outline"}
      className=" capitalize"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("UnPublishing Workflow...", {
          id: workflowId,
        });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <Download className="text-destructive" />
      {mutation.isPending ? "unpublishing..." : "unpublish"}
    </Button>
  );
}
