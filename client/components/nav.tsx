"use client";
import { ModeToggle } from "./theme-toggler";
import Link from "next/link";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuthStore } from "@/lib/store";
import useStore from "@/lib/hooks/useStore";

const Navigation = () => {
  const name = useStore(useAuthStore, (state) => state.user?.name);
  return (
    <nav className="flex justify-between py-8">
      <Link href="/">
        <h1 className="text-rouge">Surj</h1>
      </Link>
      <div className="flex space-x-8">
        <ModeToggle />
        <Popover>
          <PopoverTrigger>
            <User size={36} />
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="text-center text-iconic text-xl dark:text-blanc">
              {name ? `Hey there ${name}` : "Welcome"}
            </h3>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navigation;
