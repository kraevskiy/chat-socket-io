import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import { useAuthContext } from "@/context/AuthContext.tsx";

const AppRoutes = () => {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
