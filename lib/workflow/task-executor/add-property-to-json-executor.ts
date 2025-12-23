import { ExecutionEnv } from "@/lib/types/executor";
import { AddPropertyToJsonTask } from "../task/add-property-to-json-task";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnv<typeof AddPropertyToJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("Missing required input: 'JSON'.");
      return false;
    }

    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("Missing required input: 'Property name'.");
      return false;
    }

    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("Missing required input: 'Property value'.");
      return false;
    }

    let json: Record<string, typeof propertyValue>;
    try {
      json = JSON.parse(jsonData);
      json[propertyName] = propertyValue;
    } catch (parseError) {
      environment.log.error("Invalid JSON provided.");
      environment.log.error(`Parsing error: ${(parseError as Error).message}`);
      return false;
    }

    environment.setOutput("Updated JSON", JSON.stringify(json));
    environment.log.info(`JSON updated successfully: ${JSON.stringify(json)}`);
    return true;
  } catch (error) {
    const e = error as Error;
    environment.log.error("Failed to add property to JSON.");
    environment.log.error(`Internal error: ${e.message}`);
    return false;
  }
}
