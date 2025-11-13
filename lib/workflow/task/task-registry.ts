import { ExtractTextFromElementTask } from "./extract-text-from-element-task";
import { HtmlPageTask } from "./html-page-task";
import { LaunchBrowserTask } from "./launch-browser-task";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: HtmlPageTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
