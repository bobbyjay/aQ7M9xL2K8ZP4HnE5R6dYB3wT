// app\root.jsx

import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "react-router";

// Use standard named imports for Vite's compiler
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "../src/context/AuthContext";
import { MenuProvider } from "../src/context/MenuContext";

import "../src/index.css";

export default function Root() {
  const matches = useMatches();

  const scripts = matches.flatMap((match) => {
    return match.handle?.scripts ?? [];
  });

  const scriptModule = matches.flatMap((match) => {
    return match.handle?.scriptModule ?? [];
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>

      <body>
        <HelmetProvider>
          <AuthProvider>
            <MenuProvider>
              <Outlet />
            </MenuProvider>
          </AuthProvider>
        </HelmetProvider>

        <ScrollRestoration /> 

        {scripts.map((src) => (
          <script key={src} src={src} defer />
        ))}

        {scriptModule.map((src) => (
          <script
            key={src}
            type="module"
            src={src}
          />
        ))}

        <Scripts />
      </body>
    </html>
  );
}
