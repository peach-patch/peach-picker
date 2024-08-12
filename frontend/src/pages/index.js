import { useEffect } from "react";
import Menu from "@/components/Menu";
import ThirdView from "@/components/main/ThirdView";
import SecondView from "@/components/main/SecondView";
import LastView from "@/components/main/LastView";

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    let currentSection = 0;
    let startY = 0;

    const scrollToSection = (index) => {
      sections[index].scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = (event) => {
      if (event.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection += 1;
      } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection -= 1;
      }
      scrollToSection(currentSection);
    };

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      const endY = event.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (deltaY > 50 && currentSection < sections.length - 1) {
        currentSection += 1;
      } else if (deltaY < -50 && currentSection > 0) {
        currentSection -= 1;
      }
      scrollToSection(currentSection);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      id="fullpage"
      className="h-screen overflow-hidden snap-y snap-mandatory"
    >
      <div className="flex w-full h-screen section snap-start">
        <Menu />
      </div>
      <div className="flex justify-center h-screen bg-amber-50 section snap-start">
        <ThirdView />
      </div>
      <div className="flex items-center justify-center h-screen bg-amber-100 section snap-start">
        <SecondView />
      </div>
      <div className="flex h-screen section snap-start">
        <LastView />
      </div>
    </div>
  );
}

export default App;
