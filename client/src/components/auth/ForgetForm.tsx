import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { forgetPassword } from "@/services/authServices";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate=useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response=await forgetPassword(email);
      toast.success(response. message)
      navigate("/auth/reset-password")
    } catch (err: any) {
      setError(err.response.data.message);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Welcome to HatBato</h1>
            <div className="text-center text-sm">Enter the email below to recieve OTP</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email"> Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">
              {loading ? <LoaderIcon className="animate-spin" /> : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
