import { ExecutionEnv } from "@/lib/types/executor";
import { WaitForElementTask } from "../task/wait-for-element-task";

export async function WaitForElementExecutor(
  environment: ExecutionEnv<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Missing required input: 'Selector'.");
      return false;
    }

    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("Missing required input: 'Visibility'.");
      return false;
    }

    const page = environment.getPage();
    if (!page) {
      environment.log.error("Browser page is not available.");
      return false;
    }

    environment.log.info(
      `Waiting for element "${selector}" with visibility "${visibility}".`
    );

    await page.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.info(`Element "${selector}" is now available on the page.`);

    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Failed to wait for element.");
    environment.log.error(`Error details: ${e.message}`);

    return false;
  }
}
