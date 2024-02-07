"use client";

import { Error as ErrorPage } from "components/Error";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage title="Something went wrong..." />;
}
