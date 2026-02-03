import { useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { GoSearch, GoHistory } from "react-icons/go";

interface SearchBarProps {
  isOpen?: boolean;
}

export default function SearchBar({ isOpen = false }: SearchBarProps) {
  const [searchHistory] = useState<string[]>([]);

  const { search, setSearch } = useSearchStore();

  const mockSearchResults: string[] = [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`absolute shadow-header bg-white top-0 right-0 z-50  ${
        isOpen ? "animate-slideIn" : "w-0 opacity-0"
      }`}
    >
      {" "}
      <div className="relative">
        <input
          type="text"
          placeholder="Digite o nome do projeto..."
          className={`w-full bg-white py-2 pl-10 pr-4 h-header ${searchHistory.length > 0 ? "rounded-tr-2xl rounded-tl-2xl" : ""}`}
          value={search}
          onChange={handleSearchChange}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-02">
          <GoSearch />
        </span>
      </div>
      <div className="search-history text-gray-00">
        {mockSearchResults.map((result, index) => (
          <div
            key={index}
            className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-05 cursor-pointer"
          >
            <GoHistory className="inline mr-2" />
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
