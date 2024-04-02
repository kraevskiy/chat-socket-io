import { Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "@/store/user.store.ts";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader.tsx";

const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
// import { useAuthContext } from "@/context/AuthContext.tsx";
const SignUp = lazy(() => import("@/pages/signup"));

const AppRoutes = () => {
  // const { authUser } = useAuthContext();
  const { user } = useUserStore();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Suspense fallback={<Loader />}><Home /></Suspense> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Suspense fallback={<Loader />}><Login /></Suspense>}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Suspense fallback={<Loader />}><SignUp /></Suspense>}
      />
    </Routes>
  );
};

export default AppRoutes;
