import { useState } from "react";
import EmptyList from "./EmptyList";
import ProjectCard from "./ProjectCard";
import FilterBar from "../FilterBar";
import Modal from "../Modal";
import type { Project } from "@/types/project";

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Projeto 01",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: true,
    coverImage: "/img/cover.png",
  },
  {
    id: "2",
    name: "Projeto 02",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "3",
    name: "Projeto 03",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "4",
    name: "Projeto 04",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "5",
    name: "Projeto 05",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "6",
    name: "Projeto 06",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "7",
    name: "Projeto 07",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: true,
    coverImage: undefined,
  },
  {
    id: "8",
    name: "Projeto 08",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
  {
    id: "9",
    name: "Projeto 09",
    client: "Clicksign",
    startDate: "01 de setembro de 2024",
    endDate: "12 de dezembro de 2024",
    isFavorite: false,
    coverImage: undefined,
  },
];

export default function ProjectsList() {
  const [projects, setProjects] = useState(mockProjects);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleToggleFavorite = (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  };

  const handleEditProject = (id: string) => {
    console.log("Edit project:", id);
  };

  const handleOpenRemoveModal = (id: string) => {
    const project = projects.find((p) => p.id === id) ?? null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleConfirmRemove = () => {
    if (!selectedProject) return;
    setProjects(projects.filter((p) => p.id !== selectedProject.id));
    handleCloseModal();
  };

  const filteredProjects = showFavoritesOnly
    ? projects.filter((p) => p.isFavorite)
    : projects;

  if (filteredProjects.length === 0) {
    return <EmptyList />;
  }

  return (
    <div>
      <FilterBar
        totalProjects={projects.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={setShowFavoritesOnly}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div className="px-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onToggleFavorite={handleToggleFavorite}
              onEdit={handleEditProject}
              onRemove={handleOpenRemoveModal}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Remover projeto"
        description="Essa ação removerá definitivamente o projeto:"
        projectName={selectedProject?.name ?? ""}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
