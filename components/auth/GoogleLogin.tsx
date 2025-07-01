import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/ui/loading-dots";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { GoogleIcon } from "@/icons/GoogleIcon";

interface AuthGoogleProps {
  isSignup?: boolean;
}

export default function AuthGoogle({ isSignup }: AuthGoogleProps) {
  const { login, isLoading, error } = useGoogleAuth();

  return (
    <div className="my-2 space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => login()}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadingDots className="text-primary" />
        ) : (
          <>
            <GoogleIcon
              height={20}
              width={20}
              className="bg-white p-1 rounded-sm"
            />
            <span className="text-primary">
              {isSignup ? "Sign up with Google" : "Sign in with Google"}
            </span>
          </>
        )}
      </Button>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  );
}
