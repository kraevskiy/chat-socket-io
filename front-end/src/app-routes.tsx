import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
// import { useAuthContext } from "@/context/AuthContext.tsx";
import { useUserStore } from "@/store/user.store.ts";

const AppRoutes = () => {
  // const { authUser } = useAuthContext();
  const { user } = useUserStore();

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
