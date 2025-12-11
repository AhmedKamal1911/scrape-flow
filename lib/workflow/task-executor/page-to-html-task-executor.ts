import { ExecutionEnv } from "@/lib/types/executor";
import { HtmlPageTask } from "../task/html-page-task";

export async function PageToHtmlTaskExecutor(
  environment: ExecutionEnv<typeof HtmlPageTask>
): Promise<boolean> {
  try {
    const page = environment.getPage();

    if (!page) {
      environment.log.error(
        "Cannot access the page. Please refresh and try again."
      );
      return false;
    }

    const html = await page.content();
    environment.setOutput("Html", html);

    environment.log.info("Page content retrieved.");
    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Could not retrieve the page content.");
    environment.log.error(`Internal error: ${e.message}`);

    return false;
  }
}
