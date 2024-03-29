import { ThemeProvider } from "@/components/theme-provider.tsx";
import Layout from "@/components/layout.tsx";
import Home from "@/pages/home";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
