import { createFileRoute } from "@tanstack/react-router";
import SimpleForm from "~/app/home/components/SimpleForm";
import { type SimpleFormSchemaType } from "~/app/home/schema";
import { type ValidationResponse } from "~/lib/form-helper";
import { getFlashData } from "~/lib/getFlashData";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const flashData =
      (await getFlashData()) as ValidationResponse<SimpleFormSchemaType> | null;
    return {
      name: "Home",
      flashData,
    };
  },
});

function RouteComponent() {
  return (
    <main className="p-4 pt-8 sm:pt-12">
      <h1 className="text-2xl font-bold mb-4">Examples</h1>
      <div className="flex">
        <SimpleForm />
      </div>
    </main>
  );
}
