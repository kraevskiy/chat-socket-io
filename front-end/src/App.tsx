import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout.tsx";
import AppRoutes from "@/app-routes.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <AppRoutes />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
