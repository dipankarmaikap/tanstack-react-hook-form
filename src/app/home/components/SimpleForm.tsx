import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSimpleForm } from "~/app/home/actions";
import { SimpleFormSchema, type SimpleFormSchemaType } from "~/app/home/schema";
import { type ValidationResponse } from "~/lib/form-helper";
import { submitFormData } from "~/lib/submitFormData";
import { Route } from "~/routes";

export default function SimpleForm() {
  const simpleForm = useForm<SimpleFormSchemaType>({
    resolver: zodResolver(SimpleFormSchema),
  });
  const { register, handleSubmit, formState, setError } = simpleForm;
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<SimpleFormSchemaType> = async (_, e) => {
    if (!e) return;
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await submitFormData<
        ValidationResponse<SimpleFormSchemaType>
      >(registerSimpleForm.url, formData);
      if (!response.success) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field as keyof SimpleFormSchemaType, {
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
  const { flashData } = Route.useLoaderData();
  const haveErrors = flashData?.success === false;
  const showError = errors?.email || haveErrors;
  return (
    <form
      method="POST"
      action={registerSimpleForm.url}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="email">
        <input
          className="flex border"
          defaultValue={flashData?.data.email}
          {...register("email", { required: true })}
        />
        <span
          className={clsx("text-red-600 flex text-sm mt-0.5", {
            hidden: !showError,
          })}
        >
          {haveErrors
            ? flashData.errors?.email
            : errors?.email?.message?.toString()}
        </span>
      </div>
      <input
        disabled={isSubmitting}
        className="flex bg-neutral-800 text-white disabled:opacity-60"
        type="submit"
        value={isSubmitting ? "Submitting..." : "Submit"}
      />
    </form>
  );
}
