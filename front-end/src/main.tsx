import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Loader from "@/components/loader.tsx";
const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
