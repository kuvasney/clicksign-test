import { useSearchStore } from "@/store/useSearchStore";
import SearchBar from "@/components/SearchBar";
import { GoSearch } from "react-icons/go";

export default function ProjectSearch() {
  const { setShowSearchBar, showSearchBar } = useSearchStore();

  return (
    <>
      <button
        className="justify-self-end text-white text-xl cursor-pointer"
        onClick={() => setShowSearchBar(true)}
      >
        <GoSearch />
      </button>
      <SearchBar isOpen={showSearchBar} />
    </>
  );
}
