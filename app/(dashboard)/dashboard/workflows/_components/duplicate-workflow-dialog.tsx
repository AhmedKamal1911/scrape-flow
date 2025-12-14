"use client";
import CustomDialogHeader from "@/components/common/custom-dialog-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Copy, LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DuplicateWorkflowInputs,
  duplicateWorkflowSchema,
} from "@/lib/validation/workflow";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { duplicateWorkflowAction } from "@/lib/server/actions/workflows/duplicate-workflow-action";

export default function DuplicateWorkflowDialog({
  workflowId,
}: {
  workflowId: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<DuplicateWorkflowInputs>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
      name: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: duplicateWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow Duplicated", { id: "duplicate-workflow" });
      setOpen((prev) => !prev);
    },
    onError: (error) => {
      toast.error(error.message, { id: "duplicate-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: DuplicateWorkflowInputs) => {
      toast.loading("Duplicating workflow...", { id: "duplicate-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="capitalize">
          <Copy size={16} />
          {"Duplicate"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-[370px]:p-2">
        <CustomDialogHeader title="Duplicate" icon={Copy} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Workflow name" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter a unique name for your workflow.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your workflow"
                      className="max-h-[150px]"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Provide a brief description of what your workflow does.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="capitalize w-full"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin size-6" />
              ) : (
                "proceed"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>

      <DialogDescription className="sr-only">
        Duplicate dialog
      </DialogDescription>
    </Dialog>
  );
}
