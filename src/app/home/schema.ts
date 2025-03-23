import { z } from "zod";

const SimpleFormSchema = z.object({
  email: z.string().email(),
});

export type SimpleFormSchemaType = z.infer<typeof SimpleFormSchema>;

export { SimpleFormSchema };
