import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper-utils";
import { Suspense } from "react";
import PageHeader from "../_components/common/page-header";
import { Button } from "@/components/ui/button";

export default function WorkFlowsPage() {
  return (
    <div>
      <PageHeader
        title="Workflows"
        description="Manage your  workflows."
        action={<Button>Add workflow</Button>}
      />
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full bg-gray-200" />
      ))}
    </div>
  );
}
async function UserWorkflows() {
  await waitFor();
  return <div></div>;
}
