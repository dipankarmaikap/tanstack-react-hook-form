import { createServerFn } from "@tanstack/react-start";
import { SignUpSchema, type SignUpSchemaType } from "~/app/register/schema";
import {
  generateResponse,
  parseFormData,
  validateData,
} from "~/lib/form-helper";
import { delay } from "~/utils/delay";

export const registerUser = createServerFn({
  method: "POST",
  response: "raw",
})
  .validator(parseFormData)
  .handler(async ({ data }) => {
    await delay(1000);
    const validationResult = validateData(data, SignUpSchema);
    if (!validationResult.success) {
      return generateResponse<SignUpSchemaType>(validationResult);
    }
    if (validationResult.data.email === "dipankarmaikap77@gmail.com") {
      return generateResponse<SignUpSchemaType>({
        success: false,
        data: validationResult.data,
        errors: { email: "This email is already taken" },
      });
    }

    return generateResponse({ ...validationResult, message: "Success" });
  });
