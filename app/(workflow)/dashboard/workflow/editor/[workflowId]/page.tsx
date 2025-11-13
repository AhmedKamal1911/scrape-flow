import { waitFor } from "@/lib/helper-utils";
import { getUserWorkflowById } from "@/lib/queries/workflow/get-user-workflow-by-id";
import { auth } from "@clerk/nextjs/server";
import EditorBox from "../../_components/editor-box";

type Props = {
  params: Promise<{
    workflowId: string;
  }>;
};
export default async function page({ params }: Props) {
  const { workflowId } = await params;
  const { userId } = await auth();
  if (!userId) return <div>unauthenticated</div>;
  // TODO: Customize the unauthenticated ui
  // await waitFor(5000);
  try {
    const workflow = await getUserWorkflowById(userId, workflowId);

    return <EditorBox workflow={workflow} />;
  } catch (error) {
    return <div>{error as string}</div>;
  }
}
