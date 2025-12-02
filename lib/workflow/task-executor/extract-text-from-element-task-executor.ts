import { ExecutionEnv } from "@/lib/types/executor";
import * as cheerio from "cheerio";
import { ExtractTextFromElementTask } from "../task/extract-text-from-element-task";

export async function ExtractElementFromHtmlTaskExecutor(
  environment: ExecutionEnv<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("selector not found");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      console.error("html not found");
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      console.error("element not found");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("element has no text");
      return false;
    }
    environment.setOutput("Extracted text", extractedText);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
