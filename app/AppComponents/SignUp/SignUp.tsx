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
import { signUpSchema } from "../ValidationSchema";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/app/stores/useUserStore";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const { toast } = useToast();
  const router = useRouter();
  
  const { signUpFunction, isLoading } = useUserStore();

  const onSubmit = async (data: SignUpFormData) => {
    const res = await signUpFunction({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    if (res.result) {
      toast({
        title: "Sign up successful!",
        description: "Your account has been created.",
      });
      router.push("/to-dos");
    } else if (res.error) {
      toast({
        title: res.error,
        description:
          "This email is already registered. Please use a different email or try logging in.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sign up failed",
        description: "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleErrorToast = () => {
    const { errors } = methods.formState;
    const errorFields = ["firstName", "lastName", "email", "password", "confirmPassword"] as const;

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
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <DefaultInput
                    name="firstName"
                    label="First name"
                    type="text"
                    placeholder="John"
                    errorText="First name is required"
                  />
                  <DefaultInput
                    name="lastName"
                    label="Last name"
                    type="text"
                    placeholder="Doe"
                    errorText="Last name is required"
                  />
                </div>
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
                <DefaultInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder=""
                  errorText="Passwords do not match"
                />
                <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <span>Already have an account?</span>
                  <Label className="text-primary">
                    <Link href={"/"}>Login</Link>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {isLoading ? "loading..." : "Create an account"}
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
