import NewProjectButton from "./ProjectsList/NewProjectButton";

interface FilterBarProps {
  totalProjects: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: (value: boolean) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export default function FilterBar({
  totalProjects,
  showFavoritesOnly,
  onToggleFavorites,
  sortOrder,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between px-16 py-6">
      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-blue-01">Projetos </span>
          <span className="text-body text-gray-00 text-x">
            ({totalProjects})
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={showFavoritesOnly}
            onClick={() => onToggleFavorites(!showFavoritesOnly)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
              showFavoritesOnly ? "bg-blue-02" : "bg-gray-04"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showFavoritesOnly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-02">Apenas Favoritos</span>
        </label>

        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full md:w-[296px] px-4 py-2 border rounded-lg text-base text-gray-02 border-gray-02"
        >
          <option value="alphabetical">Ordem alfabética</option>
          <option value="date">Data de criação</option>
          <option value="end-date">Data de término</option>
        </select>

        <NewProjectButton />
      </div>
    </div>
  );
}
