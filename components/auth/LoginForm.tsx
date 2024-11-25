"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinInputSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import zod from "zod";
import { useState } from "react";
import Loader from "../loading/Loader";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Input } from "../ui/input";
import { login } from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation"

const LoginForm = () => {
  const form = useForm<zod.infer<typeof signinInputSchema>>({
    resolver: zodResolver(signinInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter()

  const onSubmit = async (values: zod.infer<typeof signinInputSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    const res = await login(values.email, values.password);
    if (res?.error) {
      setError(res.error);
      toast({
        title: "Oops!!",
        variant: "destructive",
        description: res.error,
      });
      setLoading(false);
      return;
    }
    setSuccess(res?.success || "");
    toast({
      title: "Successfully Done!!",
      description: res?.success,
    });
    router.push("/home")
    setLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        {error && <p className="text-xl text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-xl text-green-500 text-center">{success}</p>
        )}
        <form
          onSubmit={form.handleSubmit((values) => {
            onSubmit(values)
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{"EMAIL"}</FormLabel>
                <FormControl>
                  <Input type={"email"} placeholder={"email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{"PASSWORD"}</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder={"password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"blue"} className="mt-4">
            {loading ? <Loader /> : "Log In"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 max-md:text-sm">
        Don&apos;t Have an account?{" "}
        <Link href={"/auth/register"} className="underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
