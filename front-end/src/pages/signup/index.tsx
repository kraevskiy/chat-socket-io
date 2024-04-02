import { lazy, Suspense } from "react";
import Loader from "@/components/loader.tsx";
const SignupForm = lazy(() => import('./signup-form'));

const Signup = () => {
  return (
    <div className="w-[400px] max-w-[100%] md:w-[800px] relative">
      <div
        className="absolute -inset-2 bg-gradient-to-r from-pink-400 dark:from-pink-600 to-purple-400 dark:to-purple-600 rounded-lg blur-md opacity-50 animate-tilt" />
      <Suspense fallback={<Loader />}>
        <SignupForm />
      </Suspense>
    </div>
  );
};

export default Signup;
