import "@/styles/globals.css";
import Menu from "@/components/Menu";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Menu />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
