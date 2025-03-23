import { getWebRequest } from "@tanstack/react-start/server";
import { ZodSchema } from "zod";

const FLASH_TIMEOUT = 5;

interface ValidationResult<T> {
  success: true;
  message?: string;
  data: T;
}

type FormDataObject = Record<string, any>;

interface ValidationError {
  success: false;
  data: FormDataObject;
  errors: Record<string, string>;
}

export type ValidationResponse<T> = ValidationResult<T> | ValidationError;

export const validateData = <T>(
  data: FormData,
  schema: ZodSchema<T>
): ValidationResponse<T> => {
  const formObject = Object.fromEntries(data.entries()) as FormDataObject;
  const result = schema.safeParse(formObject);
  if (result.error) {
    return {
      data: formObject,
      success: false,
      errors: Object.fromEntries(
        result.error.issues?.map((issue) => [issue.path[0], issue.message]) ||
          []
      ),
    };
  }
  return { success: true, data: result.data };
};

export const parseFormData = (data: unknown): FormData => {
  if (!(data instanceof FormData)) {
    throw new Error("Invalid form data");
  }
  return data;
};

export const generateResponse = <T>(
  data: ValidationResponse<T>,
  status: number = 301
): Response => {
  const request = getWebRequest();
  const responseString = JSON.stringify(data);
  const responseType = request?.headers.get("accept");

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const isJson = responseType?.includes("application/json");

  if (!isJson) {
    const requestSource = new URL(request?.headers.get("referer") || "");
    headers.set("Location", requestSource.pathname);
    headers.set(
      "Set-Cookie",
      `flashData=${encodeURIComponent(
        responseString
      )}; Path=/; Max-Age=${FLASH_TIMEOUT}; Secure; HttpOnly`
    );
  }

  return new Response(responseString, {
    status: isJson ? 200 : status,
    headers,
  });
};
