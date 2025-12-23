import { NodeTaskType } from "@/lib/types/nodeTask";
import { ExtractTextFromElementTask } from "./extract-text-from-element-task";
import { HtmlPageTask } from "./html-page-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { WorkflowTask } from "@/lib/types/workflow";
import { FillInputTask } from "./fill-input-task";
import { ElementClickerTask } from "./element-clicker-task";
import { WaitForElementTask } from "./wait-for-element-task";
import { DeliverViaWebhookTask } from "./deliver-via-webhook-task";
import { ExtractDataWithAiTask } from "./extract-data-with-ai-task";
import { ReadPropertyFromJsonTask } from "./read-property-from-json-task";
import { AddPropertyToJsonTask } from "./add-property-to-json-task";
import { NavigateUrlTask } from "./navigate-url-task";
import { ScrollToElementTask } from "./scroll-to-element-task";

type TaskRegistryType = {
  [X in NodeTaskType]: WorkflowTask & { type: X };
};
export const TaskRegistry: TaskRegistryType = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: HtmlPageTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  ELEMENT_CLICKER: ElementClickerTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
  NAVIGATE_URL: NavigateUrlTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
};
