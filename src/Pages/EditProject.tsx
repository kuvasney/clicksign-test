import { useParams } from "react-router-dom";
import { useProjectsApi } from "@/hooks/useProjectsApi";
import ButtonVoltar from "@/components/ButtonVoltar";
import UpdateProject from "@/components/Project/UpdateProject";
import type { IProject } from "@/types/project";

export default function NewProject() {
  const { id } = useParams();
  const { project, isProjectLoading, isProjectError } = useProjectsApi(id);

  if (isProjectLoading) return <p>Carregando projeto...</p>;
  if (isProjectError) return <p>Erro ao carregar projeto</p>;
  if (!project) return <p>Projeto não encontrado</p>;

  return (
    <div className="px-16 pb-8">
      <ButtonVoltar />
      <h1 className="text-2xl font-semibold text-blue-01">Editar Projeto</h1>
      <div className="border border-gray-03 mt-6 rounded-lg">
        <UpdateProject projectToUpdate={project as IProject} />
      </div>
    </div>
  );
}
