"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) 

{
  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head />
      <body>
          <SessionProvider>
              {children}
          </SessionProvider>
      </body>
    </html>
  );


}
