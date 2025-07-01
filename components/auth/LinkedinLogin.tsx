import { LinkedinIcon } from "@/icons/LinkedinIcon";
import { useGoogleLogin } from "@react-oauth/google";

interface AuthGoogleProps {
  isSignup?: boolean;
}

export default function AuthLinkedin({ isSignup }: AuthGoogleProps) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  return (
    <div className="my-2">
      <button
        type="submit"
        className="flex items-center bg-white px-4 bg gap-4 border border-primary rounded-sm w-full justify-center"
        onClick={() => login()}
      >
        <LinkedinIcon height={25} width={25} />
        <span className="p-2 text-primary">
          {isSignup ? "Signup with LinkedIn" : "Signin with LinkedIn"}
        </span>
      </button>
    </div>
  );
}
