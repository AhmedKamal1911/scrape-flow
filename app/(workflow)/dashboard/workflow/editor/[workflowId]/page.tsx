import { getUserWorkflowUsecase } from "@/lib/dal";

import { notFound } from "next/navigation";
import EditorBox from "../_components/editor-box";

export default async function page({
  params,
}: PageProps<"/dashboard/workflow/editor/[workflowId]">) {
  const { workflowId } = await params;
  const workflow = await getUserWorkflowUsecase(workflowId);
  if (!workflow) return notFound();

  return <EditorBox workflow={workflow} />;
}
