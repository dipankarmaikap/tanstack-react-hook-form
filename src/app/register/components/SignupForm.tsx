import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpSchemaType } from "~/app/register/schema";
import { registerUser } from "~/app/register/actions";
import { Route } from "~/routes/register";
import { ValidationResponse } from "~/lib/form-helper";
import Input from "~/components/Input";
import { submitFormData } from "~/lib/submitFormData";

export default function SignupForm() {
  const { flashData } = Route.useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit: SubmitHandler<SignUpSchemaType> = async (_, e) => {
    if (!e) return;
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await submitFormData<
        ValidationResponse<SignUpSchemaType>
      >(registerUser.url, formData);
      if (!response.success) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as keyof SignUpSchemaType, {
            type: "validate",
            message,
          });
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      action={registerUser.url}
      method="POST"
      className="form flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input<SignUpSchemaType>
        label="Age"
        name="age"
        type="number"
        placeholder="Enter your age"
        register={register}
        errors={errors}
        flashData={flashData}
      />
      <Input<SignUpSchemaType>
        label="Email"
        name="email"
        type="email"
        placeholder="eg. mail@yourdomain.com"
        register={register}
        errors={errors}
        flashData={flashData}
      />
      <Input<SignUpSchemaType>
        label="Password"
        name="password"
        type="password"
        placeholder="min 3 characters"
        register={register}
        errors={errors}
        flashData={flashData}
      />
      <div className="submit mt-2">
        <button
          className="bg-neutral-900 text-white p-2 rounded-xs cursor-pointer hover:bg-neutral-800 w-full min-w-40 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
