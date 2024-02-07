"use client";

import { Button } from "@mui/material";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html className="w-full h-full">
      <body className="w-full h-full">
        <main className="h-full w-full">
          <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </div>
        </main>
      </body>
    </html>
  );
}
