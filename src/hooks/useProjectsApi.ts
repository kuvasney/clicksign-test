import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/config/supabase";
import type { IProject, IProjectInput } from "@/types/project";

export const useProjectsApi = (projectId?: string) => {
  const queryClient = useQueryClient();

  const uploadCoverImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("project-cover")
      .upload(`covers/${fileName}`, file);

    if (error) {
      throw new Error("Erro ao fazer upload da imagem");
    }

    // Obter URL pública
    const { data: publicUrl } = supabase.storage
      .from("project-cover")
      .getPublicUrl(`covers/${fileName}`);

    return `${publicUrl.publicUrl}?v=${Date.now()}`;
  };

  const fetchSingleProject = async (id: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Erro ao buscar o projeto");
    }

    return data;
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      throw new Error("Erro ao buscar os projetos");
    }

    return data;
  };

  const postProject = async (projectData: IProjectInput) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([projectData]);

    if (error) {
      throw new Error("Erro ao criar o projeto");
    }

    return data;
  };

  const updateProject = async (
    projectId: number,
    projectData: Partial<IProjectInput>,
  ) => {
    const { data, error } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", projectId);

    if (error) {
      throw new Error("Erro ao atualizar o projeto");
    }

    return data;
  };

  const deleteProject = async (projectId: number) => {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      throw new Error("Erro ao deletar o projeto");
    }

    return data;
  };

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const singleProjectQuery = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchSingleProject(projectId!),
    enabled: !!projectId, // Só executa se projectId existir
    staleTime: 0, // Sem cache - sempre busca novo
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project", String(variables.projectId)],
      });
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
    projects: (projectsQuery.data ?? []) as IProject[],
    isProjectsLoading: projectsQuery.isLoading,
    isProjectsError: projectsQuery.isError,
    project: singleProjectQuery.data as IProject | undefined,
    isProjectLoading: singleProjectQuery.isLoading,
    isProjectError: singleProjectQuery.isError,
    uploadCoverImage,
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    createError: createProjectMutation.error,
    createSuccess: createProjectMutation.isSuccess,
    updateProject: updateProjectMutation.mutate,
    isUpdating: updateProjectMutation.isPending,
    updateSuccess: updateProjectMutation.isSuccess,
    updateError: updateProjectMutation.error,
    deleteProject: deleteProjectMutation.mutate,
    isDeleting: deleteProjectMutation.isPending,
    deleteError: deleteProjectMutation.error,
  };
};
