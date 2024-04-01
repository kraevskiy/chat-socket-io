import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/layout.tsx";
import AppRoutes from "@/app-routes.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { SocketContextProvider } from "@/context/socket.context.tsx";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SocketContextProvider>
          <Layout>
            <AppRoutes />
            <Toaster />
          </Layout>
        </SocketContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
