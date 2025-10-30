type Props = {
  params: Promise<{
    workflowId: string;
  }>;
};
export default async function page({ params }: Props) {
  const { workflowId } = await params;
  console.log({ workflowId });
  return <div>editor</div>;
}
