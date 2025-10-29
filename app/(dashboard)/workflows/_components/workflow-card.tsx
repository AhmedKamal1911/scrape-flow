import { Workflow } from "@prisma/client";

type Props = {
  workflow: Workflow;
};
export default function WorkflowCard({ workflow }: Props) {
  return <div>{workflow.name}</div>;
}
