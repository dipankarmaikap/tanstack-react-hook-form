import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getFlashData = createServerFn().handler(async () => {
  const cookies = getCookie("flashData");
  if (!cookies) {
    return null;
  }
  return JSON.parse(cookies);
});
