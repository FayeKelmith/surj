"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const page = () => {
  return (
    <section className="section">
      <h1 className="text-center">Login</h1>
      <Card className="my-8 p-10 bg-blanc shadow-lg dark:bg-iconic">
        <CardContent className="space-x-4 ">
          <Button className="min-h-24 min-w-24">
            <Github size={60} />
          </Button>
          <Button className="min-h-24 min-w-24">
            <Image
              src="/icons/icons8-google.svg"
              alt="Google"
              width={60}
              className="outline"
              height={60}
            />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
