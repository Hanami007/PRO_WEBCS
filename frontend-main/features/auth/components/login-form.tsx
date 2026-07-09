"use client";

import { FormEmail, FormPassword } from "@/components/form";
import { LogoImage } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginInputSchema, useLogin } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormProps = {
  onSuccess: () => void;
};

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useLogin({
    onSuccess,
  });

  const onSubmit = (values: z.infer<typeof loginInputSchema>) => {
    login.mutate(values);
  };

  return (
    <div>
      <LogoImage className="h-32 w-32 mx-auto" />
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormEmail control={form.control} name="email" label="Email" />

              <FormPassword
                control={form.control}
                name="password"
                label="Password"
              />

              <div className="flex flex-col gap-3">
                {login.isError && (
                  <p className="text-destructive">
                    {login.error instanceof Error
                      ? login.error.message
                      : "Login failed"}
                  </p>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
