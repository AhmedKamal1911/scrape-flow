import { getUserWorkflowExecutionUsecase } from "@/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { executionId: string } }
) {
  const { executionId } = params;
  console.log({ executionId });
  if (!executionId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const data = await getUserWorkflowExecutionUsecase(executionId);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
