"use client";

import { Button } from "@mui/material";
import React from "react";

interface ErrorPageProps {
  title: React.ReactNode;
}

export const Error = ({ title }: ErrorPageProps) => (
  <div className="flex flex-col space-y-6 w-full h-screen h-screen-fix">
    <div className="m-auto pb-20">
      <div className="flex flex-col space-y-4 items-center text-center max-w-[400px]">
        <h3 className="heading-h4 sm:heading-h3">{title}</h3>
        <div className="flex space-x-3">
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </div>
    </div>
  </div>
);
