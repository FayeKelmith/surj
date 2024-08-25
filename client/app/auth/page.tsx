"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store";

const formSchema = z.object({
  email: z.string().email(),
});
const page = () => {
  const router = useRouter();
  const setEmail = useUser((state) => state.updateEmail);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setEmail(values.email);

      await fetch("http://localhost:8000/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Email Sent");
          router.push("/auth/otp");
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    }
  };
  return (
    <div>
      <h1 className="text-center">Get Started</h1>
      <div className="my-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@surj.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    You'll recieve a One-Time-Password to log in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="float-right">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
