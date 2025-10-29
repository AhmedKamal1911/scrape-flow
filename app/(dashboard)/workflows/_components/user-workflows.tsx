import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GetUserWorkflows } from "@/lib/queries/workflow/get-user-workflows";
import { EqualApproximately, AlertTriangle } from "lucide-react";
import CreateWorkflowDialog from "./create-workflow-dialog";
import { isErrorType } from "@/lib/helper-utils";
import WorkflowCard from "./workflow-card";

export default async function UserWorkflows() {
  try {
    const userWorkflows = await GetUserWorkflows();

    if (userWorkflows.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <EmptyData />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3">
        {userWorkflows.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    );
  } catch (error) {
    if (isErrorType(error)) {
      return (
        <div className="flex items-center justify-center h-full">
          <ErrorAlert message={error.message} />
        </div>
      );
    }
  }
}

function EmptyData() {
  return (
    <Empty className="py-10 text-center">
      <EmptyHeader>
        <EmptyMedia className="size-20 rounded-full bg-accent" variant="icon">
          <EqualApproximately className="size-12 text-primary" />
        </EmptyMedia>
        <EmptyTitle className="text-xl sm:text-2xl font-semibold">
          No workflows yet
        </EmptyTitle>
        <EmptyDescription>
          You don’t have any workflows created. Click below to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateWorkflowDialog buttonText="create your first workflow" />
      </EmptyContent>
    </Empty>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert
      variant="destructive"
      className="w-fit flex flex-col items-center text-center gap-3 py-8 px-3 rounded-xl border border-destructive/40"
    >
      <div>
        <AlertTriangle className="size-10" />
      </div>
      <AlertTitle className="text-lg sm:text-xl font-semibold line-clamp-none">
        {message}
      </AlertTitle>
      <AlertDescription className="text-sm text-muted-foreground!">
        We couldn’t load your workflows right now. Please try again later.
      </AlertDescription>
    </Alert>
  );
}
