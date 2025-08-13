import { SideScreen } from "@/components/auth/AuthSide";
import { SignUpForm } from "@/components/auth/SignupForm";
export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6 md:p-10 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="flex justify-center">
          <h1 className="flex items-center gap-2 font-extrabold text-3xl md:text-5xl tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Register to HatBato
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="hidden lg:block items-center p-12 bg-gradient-to-br from-indigo-900 to-gray-800">
        <SideScreen />
      </div>
    </div>
  );
}
