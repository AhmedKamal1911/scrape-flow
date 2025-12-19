import { ExecutionEnv } from "@/lib/types/executor";
import { FillInputTask } from "../task/fill-input-task";

export async function FillInputValueExecutor(
  environment: ExecutionEnv<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Missing required input: 'Selector'.");
      return false;
    }

    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Missing required input: 'Value'.");
      return false;
    }

    const page = environment.getPage();
    if (!page) {
      environment.log.error("Page instance is not available.");
      return false;
    }
    environment.log.info(`Filling input field using selector: ${selector}`);
    await page.type(selector, value);
    environment.log.info("Input field filled successfully.");
    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Failed to fill input field.");
    environment.log.error(`Internal error: ${e.message}`);

    return false;
  }
}
