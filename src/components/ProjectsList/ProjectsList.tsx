import { useState } from "react";
import { useProjectsApi } from "@/hooks/useProjectsApi";
import { useSortByStore } from "@/store/useSortByStore";
import EmptyList from "./EmptyList";
import ProjectCard from "./ProjectCard";
import FilterBar from "../FilterBar";
import Modal from "../Modal";
import type { IProject, TSortOrder } from "@/types/project";

export default function ProjectsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const {
    projects,
    isProjectsLoading,
    isProjectsError,
    updateProject,
    updateError,
    deleteProject,
  } = useProjectsApi();
  const {
    showOnlyFavorites,
    toggleShowOnlyFavorites,
    sortOrder,
    setSortOrder,
  } = useSortByStore();

  const handleToggleFavorite = (id: string) => {
    const project = projects?.find((p) => p.id === id);
    if (!project) return;

    updateProject({
      projectId: Number(project.id),
      data: { isFavorite: !project.isFavorite },
    });
  };

  const handleEditProject = (id: string) => {
    console.log("Edit project:", id);
  };

  const handleOpenRemoveModal = (id: string) => {
    const project = projects?.find((p) => p.id === id) ?? null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleConfirmRemove = () => {
    if (!selectedProject) return;

    deleteProject({ projectId: Number(selectedProject.id) });
    handleCloseModal();
  };

  const filteredProjects = (projects: IProject[], sortOrder: TSortOrder) => {
    let result = projects;
    switch (sortOrder) {
      case "alphabetical":
        result = [...projects].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "startDate":
        result = [...projects].sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        );
        break;
      case "endDate":
        result = [...projects].sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
        );
        break;
      default:
        result = projects;
    }
    if (showOnlyFavorites) {
      result = result.filter((p) => p.isFavorite);
    }
    return result;
  };

  if (isProjectsError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Erro ao carregar os projetos. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (
    filteredProjects(projects ?? [], sortOrder).length === 0 &&
    !isProjectsLoading
  ) {
    return <EmptyList />;
  }

  if (isProjectsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando projetos...</p>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        totalProjects={projects?.length ?? 0}
        showFavoritesOnly={showOnlyFavorites}
        onToggleFavorites={toggleShowOnlyFavorites}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <div className="px-16 pb-8">
        {updateError && (
          <div className="col-span-full text-red-01">{updateError.message}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProjects(projects ?? [], sortOrder).map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onToggleFavorite={() => handleToggleFavorite(project.id)}
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
