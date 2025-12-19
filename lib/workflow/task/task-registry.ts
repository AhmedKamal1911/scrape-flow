import { NodeTaskType } from "@/lib/types/nodeTask";
import { ExtractTextFromElementTask } from "./extract-text-from-element-task";
import { HtmlPageTask } from "./html-page-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { WorkflowTask } from "@/lib/types/workflow";
import { FillInputTask } from "./fill-input-task";
import { ElementClickerTask } from "./element-clicker-task";
import { WaitForElementTask } from "./wait-for-element-task";
import { DeliverViaWebhookTask } from "./deliver-via-webhook-task";
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
};
