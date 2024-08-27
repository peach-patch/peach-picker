// src/store/drawingStore.js
import { create } from "zustand";
import { getDrawings } from "@/api/listApi";

const useDrawingStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    const { data } = get();
    console.log("저장된 것 출력", data);
    if (data.length > 0) {
      console.log("데이터가 스토어에 있음 ");
      return;
    }

    set({ loading: true, error: null });
    try {
      console.log("새로 부르기");
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
    console.log("새 항목 추가", newDrawing);
  },
}));

export default useDrawingStore;
