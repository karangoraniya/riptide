import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function LoginForm() {
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          {/* <Label htmlFor="email">Login with ZK</Label> */}
          {/* <Input id="email" type="email" placeholder="m@example.com" required /> */}
        </div>
        {/* <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div> */}
        {/* <Button type="submit" className="w-full">
          Login
        </Button> */}
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
      {/* <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline">
          Sign up
        </Link>
      </div> */}
    </>
  );
}
