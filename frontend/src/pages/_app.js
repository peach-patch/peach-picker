// src/pages/_app.js
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import "@/styles/globals.css";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const initialize = useAuthStore((state) => state.initialize);
  const router = useRouter();
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      {router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Menu />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default App;
