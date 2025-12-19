import { ExecutionEnv } from "@/lib/types/executor";
import * as cheerio from "cheerio";
import { ExtractTextFromElementTask } from "../task/extract-text-from-element-task";

export async function ExtractElementFromHtmlTaskExecutor(
  environment: ExecutionEnv<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Missing required input: 'Selector'.");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("Missing required input: 'Html'.");
      return false;
    }

    environment.log.info(
      `Extracting text from HTML using selector: ${selector}`
    );
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error("Element not found for the provided selector.");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Element found but contains no text.");
      return false;
    }
    environment.setOutput("Extracted text", extractedText);

    environment.log.info("Text extracted successfully.");
    return true;
  } catch (error) {
    const e = error as Error;
    environment.log.error("Failed to extract text from element.");
    environment.log.error(`Internal error: ${e.message}`);
    return false;
  }
}
