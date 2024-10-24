// src/pages/_app.js
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import darkModeStore from "@/store/darkModeStore";
import "@/styles/globals.css";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const { darkMode } = darkModeStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className={darkMode ? "dark" : ""}>
      {router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Menu />
          <Component {...pageProps} />
        </>
      )}
    </div>
  );
}

export default App;
