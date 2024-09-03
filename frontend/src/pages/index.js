import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ThirdView from "@/components/main/ThirdView";
import SecondView from "@/components/main/SecondView";
import FirstView from "@/components/main/FirstView";
import LastView from "@/components/main/LastView";

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    let startY = 0;

    const scrollToSection = (index) => {
      sections[index].scrollIntoView({ behavior: "smooth" });
    };

    scrollToSection(currentSection);
    const handleScroll = (event) => {
      if (event.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (event.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
    };

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      const endY = event.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (deltaY > 50 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (deltaY < -50 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection]);

  const handleArrowClick = (direction) => {
    if (direction === "down" && currentSection < 3) {
      setCurrentSection((prev) => prev + 1);
    } else if (direction === "up") {
      setCurrentSection(0);
    }
  };

  return (
    <div
      id="fullpage"
      className="relative h-screen overflow-hidden snap-y snap-mandatory"
    >
      <div className="flex w-full h-screen section snap-start">
        <FirstView />
      </div>
      <div className="flex justify-center h-screen bg-amber-50 section snap-start">
        <SecondView />
      </div>
      <div className="flex items-center justify-center h-screen bg-amber-100 section snap-start">
        <ThirdView />
      </div>
      <div className="flex h-screen section bg-amber-50 snap-start">
        <LastView />
      </div>

      {currentSection < 3 && (
        <button
          onClick={() => handleArrowClick("down")}
          className="fixed z-50 p-3 text-2xl text-white bg-gray-400 rounded-full bottom-5 right-5"
        >
          <FaArrowDown />
        </button>
      )}

      {currentSection === 3 && (
        <button
          onClick={() => handleArrowClick("up")}
          className="fixed z-50 p-3 text-2xl text-gray-600 bg-white rounded-full bottom-5 right-5"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default App;
