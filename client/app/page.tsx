"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import useStore from "@/lib/hooks/useStore";
import AddInfo from "@/components/add-info";
export default function Home() {
  // const accessToken = useStore(useAuthStore, (state) => state.token);
  // const name = useStore(useAuthStore, (state) => state.user?.name);
  const accessToken = useAuthStore((state) => state.token);
  const name = useAuthStore((state) => state.user?.name);
  return (
    <section className="flex flex-col items-center justify-between section ">
      <div>
        <h1 className="text-6xl font-bold text-center">Welcome to Surj</h1>
        <h2 className="text-2xl text-center my-4">
          Thank you for trusting us with your growth
        </h2>
      </div>

      <div className="flex space-x-8 mt-8">
        {!accessToken ? (
          <Link href="/auth">
            <Button className="space-x-4 text-lg">
              <KeyRound size={24} />
              <span>Get Started</span>
            </Button>
          </Link>
        ) : name ? (
          <h1>
            Hey there <span> {name}</span> 👋{" "}
          </h1>
        ) : (
          <div>
            <AddInfo />
          </div>
        )}
      </div>
    </section>
  );
}
