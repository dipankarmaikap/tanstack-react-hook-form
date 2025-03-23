export const submitFormData = async <T>(
  url: string,
  formData: FormData
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "X-Response-Type": "json",
      },
    });

    return (await response.json()) as T;
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Something went wrong. Try again.");
  }
};
