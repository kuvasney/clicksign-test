import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TSortOrder } from "@/types/project";

interface ISortOrder {
  showOnlyFavorites: boolean;
  sortOrder: TSortOrder;
  setSortOrder: (order: TSortOrder) => void;
  toggleShowOnlyFavorites: () => void;
  setShowOnlyFavorites: (show: boolean) => void;
}

export const useSortByStore = create<ISortOrder>()(
  persist(
    (set) => ({
      showOnlyFavorites: false,
      toggleShowOnlyFavorites: () =>
        set((state) => ({ showOnlyFavorites: !state.showOnlyFavorites })),
      setShowOnlyFavorites: (show) => set({ showOnlyFavorites: show }),
      sortOrder: "alphabetical",
      setSortOrder: (order) => set({ sortOrder: order }),
    }),
    { name: "sortby-storage" },
  ),
);
