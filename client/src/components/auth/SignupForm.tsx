import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "@/services/authServices";
import type { RegisterData } from "@/types/auth/types";

export function SignUpForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await signup(formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/auth/login");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.message);
      toast.error(error);
    }
  };
  return (
    <>
      <form className={cn("flex flex-col gap-4", className)} {...props} onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className=" text-sm text-balance text-white">Enter the details below to register your account</p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Saurav Pant" required onChange={handleChange}></Input>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="saurav@gmail.com" required onChange={handleChange} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" type="text" placeholder="0123456789" required onChange={handleChange}></Input>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" placeholder="Lalitpur,Nepal" required onChange={handleChange}></Input>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={!showPassword ? "password" : "text"}
                value={formData.password}
                required
                onChange={handleChange}
                className="pr-10"
              />
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            {loading ? <LoaderIcon className="animate-spin" /> : "Register"}
          </Button>
        </div>
      </form>
      <div className="after:border-border m-2 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
      </div>
      <Button variant="outline" className="w-full text-black cursor-pointer flex justify-center align-center">
        <FcGoogle className="h-25 w-25" />
        Login with Google
      </Button>
      <div className="text-center text-sm  mt-2">
        Already have an account?
        <Link to="/auth/login" state={{ from: null }} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </>
  );
}
