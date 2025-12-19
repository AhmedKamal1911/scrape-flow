import { ExecutionEnv } from "@/lib/types/executor";
import { ElementClickerTask } from "../task/element-clicker-task";

export async function ElementClickerTaskExecutor(
  environment: ExecutionEnv<typeof ElementClickerTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Missing required input: 'Selector'.");
      return false;
    }

    const page = environment.getPage();
    if (!page) {
      environment.log.error("Page instance is not available.");
      return false;
    }
    environment.log.info(`Clicking element using selector: ${selector}`);
    await page.click(selector);
    environment.log.info("Element clicked successfully.");
    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Failed to click element.");
    environment.log.error(`Internal error: ${e.message}`);

    return false;
  }
}
