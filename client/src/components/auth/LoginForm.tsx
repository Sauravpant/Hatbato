import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import React, { useState } from "react";
import type { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import type { User } from "@/types/auth/types";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login Successful");
      const user = result.payload as User;
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (user.role === "user") {
        navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <React.Fragment>
      <form className={cn("flex flex-col gap-4", className)} {...props} onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl md:text-3xl font-bold md:mb-3">Login to your account</h1>
          <p className=" text-sm text-balance text-white">Enter the details below to login to your account</p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="saurav@gmail.com" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={!showPassword ? "password" : "text"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <Button type="submit" className="w-full cursor-pointer">
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </form>
      <Link to="/auth/forget-password" className="ml-auto text-sm underline-offset-4 hover:underline">
        Forgot your password?
      </Link>
      <div className="after:border-border m-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
        <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
      </div>
      <Button variant="outline" className="w-full text-black cursor-pointer flex justify-center align-center">
        <FcGoogle className="h-6 w-6" />
        Login with Google
      </Button>
      <div className="text-center text-sm  mt-2">
        Don&apos;t have an account?{" "}
        <Link to="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </React.Fragment>
  );
}
