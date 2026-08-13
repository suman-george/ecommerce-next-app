"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";

interface AllLinksType {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const DashboardNav = ({ allLinks }: { allLinks: AllLinksType[] }) => {
  const pathname = usePathname();
  return (
    <nav>
      <AnimatePresence>
        <ul className="flex items-center gap-5 overflow-auto">
          {allLinks.map((links) => (
            <motion.li whileTap={{ scale: 0.95 }} key={links.label}>
              <Link
                className={cn(
                  "flex items-center gap-2 text-muted-foreground hover:text-foreground relative py-2",
                  pathname === links.path && "text-primary",
                )}
                href={links.path}
              >
                {links.icon}
                {links.label}
                {pathname === links.path && (
                  <motion.div
                    layoutId="nav-active"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 35 }}
                    className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-primary"
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </nav>
  );
};

export default DashboardNav;
