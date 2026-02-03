import { useState } from "react";
import { useProjectsApi } from "@/hooks/useProjectsApi";
import { useSortByStore } from "@/store/useSortByStore";
import { useSearchStore } from "@/store/useSearchStore";
import EmptyList from "./EmptyList";
import ProjectCard from "./ProjectCard";
import FilterBar from "../FilterBar";
import Modal from "../Modal";
import type { IProject, TSortOrder } from "@/types/project";
import ButtonVoltar from "../ButtonVoltar";

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

  const { search, setSearch, setShowSearchBar } = useSearchStore();

  const handleToggleFavorite = (id: number) => {
    const project = projects?.find((p) => p.id === id);
    if (!project) return;

    updateProject({
      projectId: Number(project.id),
      data: { isFavorite: !project.isFavorite },
    });
  };

  const handleEditProject = (id: number) => {
    console.log("Edit project:", id);
  };

  const handleOpenRemoveModal = (id: number) => {
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

  const closeSearchBar = () => {
    setSearch("");
    setShowSearchBar(false);
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
      const _result = result.filter((p) => p.isFavorite);
      if (_result.length > 0) {
        result = _result;
      } else {
        result = [];
      }
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

  if (projects?.length === 0 || projects === undefined) {
    return <EmptyList />;
  }

  if (isProjectsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Carregando projetos...</p>
      </div>
    );
  }

  if (search.length >= 3) {
    const searchedProjects = (projects ?? []).filter(
      (project) =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="px-16 pb-8">
        <ButtonVoltar onClick={closeSearchBar} />
        <h2 className="text-2xl font-semibold text-blue-01">
          Resultado da busca
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-6">
          {searchedProjects.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p>Nenhum projeto encontrado para "{search}".</p>
            </div>
          )}
          {searchedProjects.map((project) => (
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
    );
  }

  return (
    <div onClick={closeSearchBar}>
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
          {filteredProjects(projects ?? [], sortOrder).length === 0 && (
            <div>
              <p>Nenhum projeto encontrado com os filtros aplicados.</p>
            </div>
          )}
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
