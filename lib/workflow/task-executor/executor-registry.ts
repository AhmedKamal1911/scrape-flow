import { NodeTaskType } from "@/lib/types/nodeTask";
import { LanuchBrowserExecutor } from "./launch-browser-task-executor";
import { ExecutionEnv } from "@/lib/types/executor";
import { WorkflowTask } from "@/lib/types/workflow";
import { PageToHtmlTaskExecutor } from "./page-to-html-task-executor";
import { ExtractElementFromHtmlTaskExecutor } from "./extract-text-from-element-task-executor";
import { FillInputValueExecutor } from "./fill-input-value-executor";
import { ElementClickerTaskExecutor } from "./element-clicker-executor";
import { WaitForElementExecutor } from "./wait-for-element-executor";
import { DeliverViaWebhookExecutor } from "./deliver-via-webhook-executor";
import { ExtractDataWithAiExecutor } from "./extract-data-with-ai-executor";
import { ReadPropertyFromJsonExecutor } from "./read-property-from-json-executor";
import { AddPropertyToJsonExecutor } from "./add-property-to-json-executor";
import { NavigateUrlExecutor } from "./navigate-url-executor";
import { ScrollToElementExecutor } from "./scroll-to-element-executor";

type ExecutorFn<T extends WorkflowTask> = (
  env: ExecutionEnv<T>
) => Promise<boolean>;

type TaskExecutorRegistryType = {
  [X in NodeTaskType]: ExecutorFn<WorkflowTask & { type: X }>;
};

export const TaskExecutorRegistry: TaskExecutorRegistryType = {
  LAUNCH_BROWSER: LanuchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlTaskExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractElementFromHtmlTaskExecutor,
  FILL_INPUT: FillInputValueExecutor,
  ELEMENT_CLICKER: ElementClickerTaskExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
  NAVIGATE_URL: NavigateUrlExecutor,
  SCROLL_TO_ELEMENT: ScrollToElementExecutor,
};
