import { ExecutionEnv } from "@/lib/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser-task";
export async function LanuchBrowserExecutor(
  environment: ExecutionEnv<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch();
    environment.setBrowser(browser);

    environment.log.info("browser started successfully");
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`opened page at : ${websiteUrl}`);
    return true;
  } catch (error) {
    const e = error as Error;
    environment.log.error(e.message);
    return false;
  }
}
