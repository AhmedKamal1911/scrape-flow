import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workflow";
import { LogCollector } from "./log";

export type Environment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      // nodeid or taskid
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnv<X extends WorkflowTask> = {
  getInput(name: X["inputs"][number]["name"]): string;
  setOutput(name: X["outputs"][number]["name"], value: string): void;
  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;
  setPage(page: Page): void;
  getPage(): Page | undefined;
  log: LogCollector;
};
