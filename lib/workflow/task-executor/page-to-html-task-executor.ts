import { ExecutionEnv } from "@/lib/types/executor";

import { HtmlPageTask } from "../task/html-page-task";

export async function PageToHtmlTaskExecutor(
  environment: ExecutionEnv<typeof HtmlPageTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html);
    console.log("@page html", html);
    return true;
  } catch (error) {
    const e = error as Error;
    environment.log.error(e.message);
    return false;
  }
}
