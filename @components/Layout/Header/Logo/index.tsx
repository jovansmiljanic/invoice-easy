// Core types
import type { FC } from "react";

// Vendors
import Link from "next/link";

// Global components
import { Logo } from "@components";

const index: FC = () => {
  return (
    <Link href="/">
      <Logo $width="100" $height="50" $color="secondary" />
    </Link>
  );
};

export { index as Logo };
