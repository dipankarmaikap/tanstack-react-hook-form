import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Home",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <main className="p-4 pt-8 sm:pt-12">
      <h1 className="text-2xl font-bold">Examples</h1>
    </main>
  );
}
