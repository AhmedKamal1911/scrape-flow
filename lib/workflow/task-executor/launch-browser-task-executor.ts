import { waitFor } from "@/lib/helper-utils/wait-for";
import { ExecutionEnv } from "@/lib/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser-task";
export async function LanuchBrowserExecutor(
  environment: ExecutionEnv<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch({ headless: true });
    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
