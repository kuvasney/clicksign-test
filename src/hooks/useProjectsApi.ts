import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_CONFIG, API_ENDPOINTS } from "@/config/api";
import type { IProject } from "@/types/project";

export const useProjectsApi = () => {
  const queryClient = useQueryClient();

  const fetchProjects = async () => {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.projects}`,
      {
        method: "GET",
        headers: { ...API_CONFIG.headers },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar os projetos");
    }

    return await response.json();
  };

  const postProject = async (projectData: IProject) => {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.projects}`,
      {
        method: "POST",
        headers: { ...API_CONFIG.headers },
        body: JSON.stringify(projectData),
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao criar o projeto");
    }

    return await response.json();
  };

  const updateProject = async (
    projectId: number,
    projectData: Partial<IProject>,
  ) => {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.projects}/${projectId}`,
      {
        method: "PUT",
        headers: { ...API_CONFIG.headers },
        body: JSON.stringify(projectData),
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar o projeto");
    }

    return await response.json();
  };

  const deleteProject = async (projectId: number) => {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_ENDPOINTS.projects}/${projectId}`,
      {
        method: "DELETE",
        headers: { ...API_CONFIG.headers },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar o projeto");
    }

    return await response.json();
  };

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createProjectMutation = useMutation({
    mutationFn: postProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: number;
      data: Partial<IProject>;
    }) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: ({ projectId }: { projectId: number }) =>
      deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    projects: projectsQuery.data as IProject[] | undefined,
    isProjectsLoading: projectsQuery.isLoading,
    isProjectsError: projectsQuery.isError,
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    createError: createProjectMutation.error,
    updateProject: updateProjectMutation.mutate,
    isUpdating: updateProjectMutation.isPending,
    updateError: updateProjectMutation.error,
    deleteProject: deleteProjectMutation.mutate,
    isDeleting: deleteProjectMutation.isPending,
    deleteError: deleteProjectMutation.error,
  };
};
