import { ExecutionEnv } from "@/lib/types/executor";
import { ReadPropertyFromJsonTask } from "../task/read-property-from-json-task";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnv<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("Missing required input: 'JSON'.");
      return false;
    }

    const property = environment.getInput("Property name");
    if (!property) {
      environment.log.error("Missing required input: 'Property name'.");
      return false;
    }

    let json: Record<string, string>;
    try {
      json = JSON.parse(jsonData);
    } catch (parseError) {
      environment.log.error("Invalid JSON provided.");
      environment.log.error(`Parsing error: ${(parseError as Error).message}`);
      return false;
    }

    const propertyValue = json[property];
    if (propertyValue === undefined) {
      environment.log.error(
        `Property '${property}' not found in the provided JSON.`
      );
      return false;
    }

    environment.setOutput("Property value", propertyValue);
    environment.log.info(
      `Property '${property}' extracted successfully: ${propertyValue}`
    );
    return true;
  } catch (error) {
    const e = error as Error;
    environment.log.error("Failed to read property from JSON.");
    environment.log.error(`Internal error: ${e.message}`);
    return false;
  }
}
