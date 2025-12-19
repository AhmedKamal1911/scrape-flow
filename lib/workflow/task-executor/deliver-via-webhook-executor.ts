import { ExecutionEnv } from "@/lib/types/executor";
import { DeliverViaWebhookTask } from "../task/deliver-via-webhook-task";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnv<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("Missing required input: 'Target URL'.");
      return false;
    }

    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("Missing required input: 'Body'.");
      return false;
    }

    environment.log.info(`Sending webhook request to: ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;

    if (statusCode !== 200) {
      environment.log.error(
        `Webhook request failed with status code: ${statusCode}`
      );
      return false;
    }

    const responseBody = await response.json();

    environment.log.info("Webhook delivered successfully.");
    environment.log.info(`Response body: ${JSON.stringify(responseBody)}`);

    return true;
  } catch (error) {
    const e = error as Error;

    environment.log.error("Failed to deliver webhook.");
    environment.log.error(`Internal error: ${e.message}`);

    return false;
  }
}
