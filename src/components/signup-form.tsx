"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value;
    const confirmPassword = (e.currentTarget.elements.namedItem("confirm-password") as HTMLInputElement)?.value;

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      // TODO: Display error message to user
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User signed up:", user);
        // TODO: Redirect or show success message
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup error:", errorCode, errorMessage);
        // TODO: Display error message to user
      });
  };

  // State to manage the toggle between login and signup
  // This should ideally be managed in the parent component
  // For now, adding a placeholder to demonstrate the structure
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    // TODO: Render login form or navigate to login page
    return null; // Placeholder
  }
  return (
    <Card>
      <div className="flex flex-col items-center gap-2 text-center px-6 pt-6">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </div>
      <CardContent className="grid gap-4 px-6 pt-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm Password" required />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm w-full">
          Already have an account?{" "}
          <button className="underline underline-offset-4" onClick={() => setIsLogin(true)}>
            Login
          </button>
        </div>
      </CardContent>
    </Card>
  );
}