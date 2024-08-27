import create from "zustand";

const darkModeStore = create((set) => ({
  darkMode: false,

  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;

      if (newDarkMode) {
        document.documentElement.classList.add("dark");
        console.log("다크모드");
      } else {
        document.documentElement.classList.remove("dark");
        console.log("라이트모드");
      }
      return { darkMode: newDarkMode };
    }),
}));

export default darkModeStore;
