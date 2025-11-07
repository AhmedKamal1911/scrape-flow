import { NodeTaskType } from "@/lib/types/nodeTask";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: NodeTaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-500" {...props} />
  ),
  isEntryPoint: true,
};
