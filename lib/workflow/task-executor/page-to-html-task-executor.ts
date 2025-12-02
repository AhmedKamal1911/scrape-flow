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
    console.error(error);
    return false;
  }
}
