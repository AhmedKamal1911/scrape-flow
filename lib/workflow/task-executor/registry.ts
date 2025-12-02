import { NodeTaskType } from "@/lib/types/nodeTask";
import { LanuchBrowserExecutor } from "./launch-browser-task-executor";
import { ExecutionEnv } from "@/lib/types/executor";
import { WorkflowTask } from "@/lib/types/workflow";
import { PageToHtmlTaskExecutor } from "./page-to-html-task-executor";
import { ExtractElementFromHtmlTaskExecutor } from "./extract-text-from-element-task-executor";
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
};
