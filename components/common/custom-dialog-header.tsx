import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

type Props = {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  iconStyles?: string;
  titleStyles?: string;
  subTitleStyles?: string;
};
export default function CustomDialogHeader(props: Props) {
  return (
    <DialogHeader>
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2 p-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn("stroke-primary", props.iconStyles)}
            />
          )}
          {props.title && (
            <p
              className={cn(
                "text-xl text-primary capitalize",
                props.titleStyles
              )}
            >
              {props.title}
            </p>
          )}
          {props.subTitle && (
            <p
              className={cn(
                "text-sm text-muted-foreground capitalize",
                props.subTitleStyles
              )}
            >
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}
