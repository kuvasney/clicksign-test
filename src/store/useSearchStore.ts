import { create } from "zustand";

interface ISearchStore {
  search: string;
  setSearch: (search: string) => void;
  showSearchBar: boolean;
  setShowSearchBar: (show: boolean) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  showSearchBar: false,
  setShowSearchBar: (show) => set({ showSearchBar: show }),
}));
