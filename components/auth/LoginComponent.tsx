/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AuthGoogle from "./GoogleLogin";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface LoginComponentProps {
  isLogin?: boolean;
}
export const LoginButton: FC<LoginComponentProps> = ({ isLogin = true }) => {
  const [currentTabLogin, setCurrentTabLogin] = useState(isLogin);

  useEffect(() => {
    if (!isLogin) {
      setCurrentTabLogin(false);
    }
  }, [isLogin]);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "h-9 px-3 rounded-md text-sm font-medium ring-offset-background transition-colors",
          isLogin ? "border-1 border-gray-500" : "text-white bg-primary"
        )}
      >
        {isLogin ? "Login" : "Sign Up free"}
      </DialogTrigger>
      <DialogContent className="bg-white border-2 py-10 border-primary">
        <div className="max-w-[450px] mx-auto w-full rounded-md">
          <div className="py-4 space-y-4">
            <DialogTitle className="font-bold text-center text-xl">
              AI Tools by Azespace
            </DialogTitle>
            <p className="text-center text-lg text-neutral-500">
              {currentTabLogin
                ? "Login to your account"
                : "Create a free account"}
            </p>
          </div>
          <div className="pb-6 text-center flex flex-col text-gray-400">
            <p className="text-sm">By creating and account with Azespace</p>
            <p className="text-sm">you accept our Terms & Conditions</p>
          </div>
          <Tabs
            value={currentTabLogin ? "login" : "signup"}
            onValueChange={(v) => setCurrentTabLogin(v === "login")}
            className="flex flex-col"
          >
            <TabsList className="flex shrink-0 border-b-1 border-gray-300 rounded-none mb-6">
              <TabsTrigger
                value="login"
                className="flex h-[38px] flex-1 rounded-none cursor-pointer select-none items-center justify-center  px-5 text-[15px] data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex h-[38px] flex-1 rounded-none cursor-pointer select-none items-center justify-center  px-5 text-[15px] data-[state=active]:text-primary  data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Create account
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm></LoginForm>
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
          <div className="py-4">
            <Separator
              className="bg-gray-200"
              style={{ margin: "10px 0" }}
            ></Separator>
            <div className="pt-4">
              <AuthGoogle></AuthGoogle>
              {/* <AuthLinkedin></AuthLinkedin> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
