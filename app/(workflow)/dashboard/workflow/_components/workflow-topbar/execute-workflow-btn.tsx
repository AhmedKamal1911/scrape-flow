import useExecutionPlan from "@/components/hooks/use-ececution-plan";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function ExecuteWorkflowBtn({
  workflowId,
}: {
  workflowId: string;
}) {
  const generateWorkflow = useExecutionPlan();
  return (
    <Button
      variant={"outline"}
      className=" capitalize"
      onClick={() => {
        const plan = generateWorkflow();
        console.log("---plan --");
        console.table({ plan });
      }}
    >
      <PlayCircle className="text-primary" />
      execute
    </Button>
  );
}
