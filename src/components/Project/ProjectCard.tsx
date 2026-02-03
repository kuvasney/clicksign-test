import { useState } from "react";
import { CalendarCheck, CalendarDay } from "../Icons";
import { GoKebabHorizontal, GoStar, GoStarFill } from "react-icons/go";
import ProjectCardOptions from "./ProjectCardOptions";
import type { IProject } from "@/types/project";

interface ProjectCardProps extends IProject {
  onToggleFavorite: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function ProjectCard({
  id,
  name,
  client,
  startDate,
  endDate,
  isFavorite,
  coverImage,
  onToggleFavorite,
  onEdit,
  onRemove,
}: ProjectCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = () => {
    onEdit(id);
    setIsMenuOpen(false);
  };

  const handleRemove = () => {
    onRemove(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl border-gray-03 border">
      <div className="relative flex items-center justify-center">
        <div className="h-48 max-h-48 object-cover rounded-t-2xl overflow-hidden w-full">
          {coverImage ? (
            <img
              src={coverImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src="/img/no-image.png" alt="Projeto sem imagem" />
          )}
        </div>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={() => onToggleFavorite(id)}
            className="w-8 h-8 flex items-center justify-center text-xl"
          >
            {isFavorite ? (
              <GoStarFill className="fill-yellow-00 stroke-white stroke-[1.5] drop-shadow-text" />
            ) : (
              <GoStar className="text-white drop-shadow-text" />
            )}
          </button>
          <div className="relative z-20">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-default"
            >
              <GoKebabHorizontal />
            </button>
            {isMenuOpen && (
              <ProjectCardOptions
                className="absolute right-0 top-[calc(100%+0.5rem)] z-20"
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-blue-01 mb-1">{name}</h3>
        <p className="text-sm text-gray-00 mb-4">
          <span className="font-semibold">Cliente:</span> {client}
        </p>
        <hr className="border-gray-05 mb-4" />
        <div className="space-y-2 text-xs text-gray-00">
          <div className="flex items-center gap-2">
            <CalendarDay className="w-4 h-4" />
            <span>
              {new Date(startDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4" />
            <span>
              {new Date(endDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
