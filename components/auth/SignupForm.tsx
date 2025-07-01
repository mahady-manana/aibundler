"use client";
import { signup } from "@/services/auth/signup";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoadingDots } from "../ui/loading-dots";

export const SignupForm = () => {
  const [state, formAction, pending] = useActionState(signup, null);
  return (
    <div>
      <form className="space-y-4" action={formAction}>
        <Label htmlFor="semail">Email</Label>
        <Input
          id="semail"
          name="semail"
          className=""
          type="email"
          disabled={pending}
        />
        {state?.errors?.semail && (
          <p className="text-sm text-destructive">{state.errors.semail}</p>
        )}
        <Label htmlFor="spassword">Password</Label>
        <Input
          id="spassword"
          name="spassword"
          type="password"
          className=""
          disabled={pending}
        />
        {state?.errors?.spassword && (
          <div className="text-sm text-destructive">
            <p>Password must:</p>
            <ul>
              {state.errors.spassword.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        {state?.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
        <Button className="w-full text-white" disabled={pending}>
          {pending ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingDots className="text-white" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  );
};
