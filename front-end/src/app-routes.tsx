import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
  );
};

export default AppRoutes;
