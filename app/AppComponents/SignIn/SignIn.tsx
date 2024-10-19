"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AppLogo from "../AppLogo";
import Link from "next/link";
import DefaultInput from "../DefaultInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../ValidationSchema";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthFormData = z.infer<typeof authSchema>;

export default function SignIn() {
  const methods = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({ 
          title: "Sign in successful!", 
          description: "You have signed in" 
        });
        router.push("/to-dos");
      } else {
        toast({ 
          title: "Sign in failed!", 
          description: result.error || "An unknown error occured",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({ 
        title: "Sign in failed!", 
        description: "An unexpected error occured. Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleErrorToast = () => {
    const { errors } = methods.formState;
    const errorFields = ["email", "password"] as const;

    errorFields.forEach((field) => {
      if (errors[field]) {
        toast({ 
          title: "Validation Error", 
          description: errors[field]?.message?.toString(),
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="flex-col">
      <AppLogo />
      <Card className="w-full max-w-sm">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, handleErrorToast)}>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <DefaultInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                errorText="Email Address is required"
              />
              <DefaultInput
                name="password"
                label="Password"
                type="password"
                placeholder=""
                errorText="Password is invalid"
              />
              <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                <span>Don't have an account?</span>
                <Label className="text-primary">
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
