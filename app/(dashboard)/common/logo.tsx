import { Waypoints } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className={`text-2xl w-full flex items-center gap-2`}>
      <div className="rounded-lg bg-primary text-white p-1">
        <Waypoints className="size-6 stroke-white" />
      </div>

      <div className="flex capitalize font-bold">
        <span className="text-primary">flow</span>
        <span className="text-accent-foreground">scrape</span>
      </div>
    </Link>
  );
}
