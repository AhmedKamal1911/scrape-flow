"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
export default function HeaderBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, i) => {
          const isLast = i === paths.length - 1;
          const href = "/" + paths.slice(0, i + 1).join("/");
          return (
            <Fragment key={i}>
              <BreadcrumbItem className="capitalize font-semibold text-accent-foreground/80">
                {isLast ? (
                  <span>{path || "Home"}</span>
                ) : (
                  <Link href={href}>{path || "Home"}</Link>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
