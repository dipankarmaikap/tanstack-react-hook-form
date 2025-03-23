import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
  age: z.coerce.number().int().positive(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export { SignUpSchema };
