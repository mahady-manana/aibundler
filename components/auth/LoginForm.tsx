"use client";
import { signin } from "@/services/auth/signin";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoadingDots } from "../ui/loading-dots";

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState(signin, null);

  return (
    <div>
      <form className="space-y-4" action={formAction}>
        <Label htmlFor="lemail">Email</Label>
        <Input
          id="lemail"
          name="lemail"
          className=""
          type="email"
          disabled={pending}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="lpassword"
          name="lpassword"
          type="password"
          className=""
          disabled={pending}
        />
        <button
          type="button"
          className="text-right float-right cursor-pointer text-primary font-bold"
          disabled={pending}
        >
          Forgot password ?
        </button>
        {state?.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
        <Button className="w-full text-white" disabled={pending}>
          {pending ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingDots className="text-white" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
};
