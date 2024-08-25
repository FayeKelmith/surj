"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { useToken } from "@/lib/store";
export default function Home() {
  const accessToken = useToken((state) => state.accessToken);
  return (
    <section className="flex flex-col items-center justify-between section ">
      <div>
        <h1 className="text-6xl font-bold text-center">Welcome to Surj</h1>
        <h2 className="text-2xl text-center">
          Thank you for trusting us with your growth
        </h2>
      </div>

      <div className="flex space-x-8 mt-8">
        {accessToken ? (
          <Link href="/auth">
            <Button className="space-x-4 text-lg">
              <KeyRound size={24} />
              <span>Get Started</span>
            </Button>
          </Link>
        ) : (
          <h1>Thank you for signing up to Surj force. Let's get started</h1>
        )}
      </div>
    </section>
  );
}
