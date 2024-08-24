// src/store/drawingStore.js
import { create } from "zustand";
import { getDrawings } from "@/api/listApi";

const useDrawingStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    const { data } = get();
    if (data.length > 0) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const result = await getDrawings();
      set({ data: result, loading: false });
    } catch (error) {
      set({ error: "Error fetching data", loading: false });
      console.error("Error fetching data:", error);
    }
  },

  addNewDrawing: (newDrawing) => {
    set((state) => ({
      data: [newDrawing, ...state.data],
    }));
  },
}));

export default useDrawingStore;
