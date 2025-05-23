import type { Metadata } from "next";
import SessionProviderWrapper from "./components/client/session-provider-wrapper";

export const metadata: Metadata = {
  title: "UlyBot Prototype",
  description: "Web frontend for a discord music bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </body>
    </html>
  );
}
