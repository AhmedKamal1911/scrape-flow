import { NodeTaskType } from "@/lib/types/nodeTask";
import { ExtractTextFromElementTask } from "./extract-text-from-element-task";
import { HtmlPageTask } from "./html-page-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { WorkflowTask } from "@/lib/types/workflow";
type TaskRegistryType = {
  [X in NodeTaskType]: WorkflowTask;
};
export const TaskRegistry: TaskRegistryType = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: HtmlPageTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
