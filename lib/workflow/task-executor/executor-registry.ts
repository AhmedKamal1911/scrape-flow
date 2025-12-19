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
};
