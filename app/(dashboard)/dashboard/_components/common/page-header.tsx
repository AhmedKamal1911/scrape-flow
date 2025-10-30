"use client";
import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};
export default function PageHeader({ title, action, description }: Props) {
  return (
    <div className="flex max-[340px]:flex-col gap-4 justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl min-[330px]:text-3xl font-bold capitalize">
          {title}
        </h1>
        {description && <p className="text-muted-foreground ">{description}</p>}
      </div>
      {action && action}
    </div>
  );
}
