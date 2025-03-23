import { createFileRoute, Link } from "@tanstack/react-router";
import SignupForm from "~/app/register/components/SignupForm";
import { type SignUpSchemaType } from "~/app/register/schema";
import { type ValidationResponse } from "~/lib/form-helper";
import { getFlashData } from "~/lib/getFlashData";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
  loader: async () => {
    const flashData =
      (await getFlashData()) as ValidationResponse<SignUpSchemaType> | null;
    return {
      name: "Register",
      time: new Date(),
      flashData,
    };
  },
  head: () => ({
    meta: [
      {
        title: "Register",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <main className="p-4 pt-8 sm:pt-20">
      <div className="max-w-md mx-auto border px-4 py-6 rounded-sm">
        <h1 className="font-bold text-3xl">Create your account</h1>
        <p className="mb-6 mt-1">
          Already have an account?{" "}
          <Link className="underline text-blue-500" to="/">
            Log in
          </Link>
        </p>
        <SignupForm />
        <div className="mt-6 text-xs font-medium text-center text-neutral-600">
          By clicking "Sign up" you accept our{" "}
          <a href="/terms-of-service" className="underline">
            Terms of Service
          </a>
          ,{" "}
          <a href="/privacy-policy" className="underline">
            Privacy Policy and Cookie Policy
          </a>
          .
        </div>
      </div>
    </main>
  );
}
