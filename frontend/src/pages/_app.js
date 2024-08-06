// src/pages/_app.js
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import "@/styles/globals.css";
import Menu from "@/components/Menu";

function App({ Component, pageProps }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  );
}

export default App;
