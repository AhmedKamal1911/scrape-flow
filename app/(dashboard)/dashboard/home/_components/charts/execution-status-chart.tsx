"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getWorkflowExecutionStats } from "@/lib/server/queries/analytics/get-workflow-execution-stats";
import { Workflow } from "lucide-react";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = {
  data: Awaited<ReturnType<typeof getWorkflowExecutionStats>>;
};

const chartConfig = {
  success: {
    label: "Success",
    color: "var(--chart-1)",
  },
  failed: {
    label: "Failed",
    color: "var(--destructive)",
  },
};
export default function ExecutionStatusChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg min-[400]:text-2xl font-bold flex items-center gap-2">
          <Workflow className="size-6 text-primary" />
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successfull and failed workflow executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-[260px]">
          <AreaChart data={data} accessibilityLayer margin={{ top: 20 }}>
            <CartesianGrid />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Area
              min={0}
              type={"basis"}
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.6}
              stackId={"b"}
              dataKey={"success"}
            />
            <Area
              min={0}
              type="basis"
              dataKey="failed"
              stroke="var(--destructive)"
              fill="var(--destructive)"
              fillOpacity={0.35}
              stackId={"a"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
