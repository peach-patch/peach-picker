import { useEffect } from "react";
import Menu from "@/components/Menu";
function App() {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    let currentSection = 0;

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

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div
      id="fullpage"
      className="h-screen overflow-hidden snap-y snap-mandatory"
    >
      <div className="flex w-full h-screen bg-blue-500 section snap-start">
        <Menu />
      </div>
      <div className="flex items-center justify-center h-screen bg-red-500 section snap-start">
        Section 2
      </div>
      <div className="flex items-center justify-center h-screen bg-green-500 section snap-start">
        Section 3
      </div>
      <div className="flex items-center justify-center h-screen bg-yellow-500 section snap-start">
        Section 4
      </div>
    </div>
  );
}

export default App;
