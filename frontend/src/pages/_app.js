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

    // Fullpage.js 초기화 상태 관리
    const initFullPage = () => {
      const fullpage = require("fullpage.js");

      // 기존 fullpage 인스턴스 제거
      if (window.fullpage_api) {
        window.fullpage_api.destroy("all");
      }

      // 새로운 fullpage 인스턴스 초기화
      new fullpage("#fullpage", {
        autoScrolling: true,
        scrollHorizontally: true,
        licenseKey: "gplv3-license",
      });
    };

    // 초기 로드 시 fullPage.js 초기화
    if (router.pathname === "/") {
      initFullPage();
    }

    // 페이지 이동 시 fullPage.js 다시 초기화
    const handleRouteChange = (url) => {
      if (url === "/") {
        initFullPage();
      } else if (window.fullpage_api) {
        window.fullpage_api.destroy("all");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      if (window.fullpage_api) {
        window.fullpage_api.destroy("all");
      }
    };
  }, [initialize, router.pathname]);

  return (
    <>
      {router.pathname === "/" ? (
        <div id="fullpage">
          <div className="h-screen bg-blue-500 section">
            <Menu />
            Section 1
          </div>
          <div className="flex items-center justify-center h-screen bg-red-500 section">
            Section 2
          </div>
          <div className="flex items-center justify-center h-screen bg-green-500 section">
            Section 3
          </div>
          <div className="flex items-center justify-center h-screen bg-yellow-500 section">
            Section 4
          </div>
        </div>
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
