// import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/app-routes.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { SocketContextProvider } from "@/context/socket.context.tsx";
import Loader from "@/components/loader.tsx";
import { lazy, Suspense } from "react";

const ThemeProvider = lazy(() => import("@/components/theme-provider.tsx"));
const Layout = lazy(() => import("@/components/layout.tsx"));

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SocketContextProvider>
            <Suspense fallback={<Loader />}>
              <Layout>
                <AppRoutes />
                <Toaster />
              </Layout>
            </Suspense>
          </SocketContextProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
