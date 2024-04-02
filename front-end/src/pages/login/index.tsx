import { lazy, Suspense } from "react";
import Loader from "@/components/loader.tsx";

const LoginForm = lazy(() => import('./login-form'));

const Login = () => {

  return (
    <div className="w-[400px] max-w-[100%] relative">
      <div
        className="absolute -inset-2 bg-gradient-to-r from-pink-400 dark:from-pink-600 to-purple-400 dark:to-purple-600 rounded-lg blur-md opacity-50 animate-tilt" />
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Login;
