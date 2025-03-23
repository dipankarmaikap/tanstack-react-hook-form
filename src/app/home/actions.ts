import { createServerFn } from "@tanstack/react-start";
import { SimpleFormSchema, type SimpleFormSchemaType } from "~/app/home/schema";
import {
  generateResponse,
  parseFormData,
  validateData,
} from "~/lib/form-helper";
import { delay } from "~/utils/delay";

export const registerSimpleForm = createServerFn({
  method: "POST",
  response: "raw",
})
  .validator(parseFormData)
  .handler(async ({ data }) => {
    await delay(1000);
    const validationResult = validateData(data, SimpleFormSchema);
    if (!validationResult.success) {
      return generateResponse<SimpleFormSchemaType>(validationResult);
    }
    if (validationResult.data.email === "admin@gmail.com") {
      return generateResponse<SimpleFormSchemaType>({
        success: false,
        data: validationResult.data,
        errors: { email: "This email is already taken" },
      });
    }
    return generateResponse({ ...validationResult, message: "Success" });
  });
