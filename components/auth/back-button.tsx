"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
type BackButtonProps = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div>
      <Button className="font-medium w-full">
        <Link href={href} aria-label={label}>
          {label}
        </Link>
      </Button>
    </div>
  );
};

export default BackButton;
