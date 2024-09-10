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
import { useAuthStore } from "@/lib/store";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import useStore from "@/lib/hooks/useStore";
const formSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(10).optional(),
});

const AddInfo = () => {
  const email = useStore(useAuthStore, (state) => state.user?.email);
  const setName = useStore(useAuthStore, (state) => state.updateName);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log({ ...values, email });
      await axios
        .post(
          "http://localhost:8000/auth/add-info",
          { ...values, email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setName && setName(values.name);

            toast.success("Info Added");
            router.refresh();
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to add Info");
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h2 className="text-center">Let us Get to know you</h2>
      <div className="my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="Name" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact">Contact</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      placeholder="Contact"
                      defaultCountry="in"
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your phone number so you can sign up with it
                    too
                  </FormDescription>
                  <FormMessage {...field} />
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

export default AddInfo;
