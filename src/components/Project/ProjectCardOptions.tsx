import { Edit, Trash } from "../Icons";

interface ProjectCardOptionsProps {
  onEdit: () => void;
  onRemove: () => void;
  className?: string;
}

export default function ProjectCardOptions({
  onEdit,
  onRemove,
  className,
}: ProjectCardOptionsProps) {
  return (
    <div
      className={`w-40 rounded-xl border border-gray-03 bg-white shadow-lg before:absolute before:-top-2 before:right-2 before:h-0 before:w-0 before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-white before:content-[''] ${className}`}
    >
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full items-center gap-3 px-4 py-3 text-blue-02"
      >
        <Edit className="h-4 w-4" />
        <span>Editar</span>
      </button>
      <div className="h-px bg-gray-01" />
      <button
        type="button"
        onClick={onRemove}
        className="flex w-full items-center gap-3 px-4 py-3 text-blue-02"
      >
        <Trash className="h-4 w-4" />
        <span>Remover</span>
      </button>
    </div>
  );
}
