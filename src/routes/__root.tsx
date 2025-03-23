import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import Header from "~/components/Header";
import { NotFound } from "~/components/NotFound";
import { rootHead } from "~/utils/rootHead";

export const Route = createRootRoute({
  head: () => rootHead,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="__root">
          <Header />
          {children}
          <TanStackRouterDevtools position="bottom-right" />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
