import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ScanFace, LockKeyholeOpen } from "lucide-react";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between section ">
      <div>
        <h1 className="text-6xl font-bold">Welcome to Surj</h1>
        <p className="text-2xl text-center">A CV Generation App</p>
      </div>
      <div className="flex space-x-8 mt-8">
        <Card className="bg-blanc dark:bg-iconic rounded-md group mx-auto p-16 hover:shadow-md duration-800 ease-in-out">
          <Link href="/auth/signin">
            <CardContent className="text-center">
              <ScanFace size={80} />
              <CardDescription className="text-xl">Signin</CardDescription>
            </CardContent>
          </Link>
        </Card>
        <Card className="bg-blanc dark:bg-iconic rounded-md group mx-auto p-16 hover:shadow-md duration-800 ease-in-out">
          <Link href="/auth/login">
            <CardContent className="text-center">
              <LockKeyholeOpen size={80} />
              <CardDescription className="text-xl">Login</CardDescription>
            </CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
}
