import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout.tsx";
import AppRoutes from "@/app-routes.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { AuthContextProvider } from "@/context/AuthContext.tsx";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthContextProvider>
          <Layout>
            <AppRoutes />
            <Toaster />
          </Layout>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
