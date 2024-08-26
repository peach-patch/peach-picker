import create from "zustand";

const darkModeStore = create((set) => ({
  darkMode: false, // 기본 값
  initializeDarkMode: () => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    set({ darkMode: savedDarkMode });

    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", newDarkMode);

      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { darkMode: newDarkMode };
    }),
}));

export default darkModeStore;
