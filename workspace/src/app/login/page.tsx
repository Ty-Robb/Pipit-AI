"use client"

import { useState } from 'react';
import Image from "next/image";
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form";
import { PipitLogo } from "@/components/icons";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
            <PipitLogo className="h-6 w-6 text-primary" />
            Pipit AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {isLogin ? (
                <LoginForm onSignupClick={() => setIsLogin(false)} />
            ) : (
                <SignupForm onLoginClick={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1200x1800.png"
          alt="Pipit AI background image"
          data-ai-hint="abstract birds"
          layout="fill"
          objectFit="cover"
          className="dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white max-w-md">
            <h2 className="font-headline text-4xl font-bold">Your AI Strategy Wingman</h2>
            <p className="mt-2 text-lg">Build smarter, faster marketing strategies with Ethan, your dedicated AI consultant.</p>
        </div>
      </div>
    </div>
  )
}
