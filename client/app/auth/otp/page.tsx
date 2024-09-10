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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "react-toastify";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import useStore from "@/lib/hooks/useStore";
import axios from "axios";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your OTP must be 6 characters",
  }),
});

const page = () => {
  // const email = useStore(useAuthStore, (state) => state.user?.email);
  // const setAccessToken = useStore(useAuthStore, (state) => state.setToken);
  const email = useAuthStore((state) => state.user?.email);
  const setAccessToken = useAuthStore((state) => state.setToken);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("otp front: ", email, values);
      const response = await axios.post("http://localhost:8000/auth/verify", {
        ...values,
        email: email,
      });
      if (response.status === 200) {
        toast.success("OTP verified");
        const token: string = response.data.token;
        setAccessToken && setAccessToken(token);
        router.push("/");
      } else {
        toast.error("Please try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send email");
    }
  };
  const router = useRouter();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div>
          <Button
            className=""
            size="icon"
            variant="outline"
            onClick={() => router.back()}
          >
            <MoveLeft size={24} />
          </Button>

          <Button type="submit" className="float-right">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default page;
