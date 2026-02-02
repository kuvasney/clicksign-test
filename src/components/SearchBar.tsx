import { useState } from "react";
import { GoSearch, GoHistory } from "react-icons/go";

interface SearchBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const mockSearchResults = [
    "Project 01",
    "Project 02",
    "Project 03",
    "Project 04",
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute shadow-header w-full border-2 border-blue-02 bg-white rounded-2xl top-0 left-0 z-50">
      <div className="relative">
        <input
          type="text"
          placeholder="Digite o nome do projeto..."
          className="w-full bg-white py-2 pl-10 pr-4 h-header rounded-tr-2xl rounded-tl-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            onClick={() => {
              setSearchTerm(result);
              if (onClose) onClose();
            }}
          >
            <GoHistory className="inline mr-2" />
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}
