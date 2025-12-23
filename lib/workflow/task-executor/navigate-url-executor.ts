import { ExecutionEnv } from "@/lib/types/executor";
import { NavigateUrlTask } from "../task/navigate-url-task";

export async function NavigateUrlExecutor(
  environment: ExecutionEnv<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error(
        "Navigate URL failed: missing required input 'URL'."
      );
      return false;
    }

    const page = environment.getPage();
    if (!page) {
      environment.log.error(
        "Navigate URL failed: page instance is not available."
      );
      return false;
    }

    environment.log.info(`Navigating to URL: ${url}`);
    await page.goto(url);

    environment.log.info(`Navigation completed successfully: ${url}`);
    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Navigate URL task failed.");
    environment.log.error(`Reason: ${e.message}`);

    return false;
  }
}
