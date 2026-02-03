import { useState, useRef } from "react";
import { useProjectsApi } from "@/hooks/useProjectsApi";
import { Trash, Upload } from "@/components/Icons";
import type { IProject, IProjectInput } from "@/types/project";

interface UpdateProjectProps {
  projectToUpdate: IProject;
}

export default function UpdateProject({ projectToUpdate }: UpdateProjectProps) {
  const {
    updateProject,
    uploadCoverImage,
    isUpdating,
    updateError,
    updateSuccess,
  } = useProjectsApi();

  const formatedStartDate = new Date(projectToUpdate.startDate)
    .toISOString()
    .split("T")[0];
  const formatedEndDate = new Date(projectToUpdate.endDate)
    .toISOString()
    .split("T")[0];
  const [projectName, setProjectName] = useState(projectToUpdate.name);
  const [clientName, setClientName] = useState(projectToUpdate.client);
  const [startDate, setStartDate] = useState(formatedStartDate);
  const [endDate, setEndDate] = useState(formatedEndDate);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    projectToUpdate.coverImage || null,
  );
  const [errorList, setErrorList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorList([]);
    const errors: string[] = [];

    if (!projectName.trim() || projectName.trim().split(" ").length < 2) {
      errors.push("projectName");
    }
    if (!clientName.trim()) {
      errors.push("clientName");
    }
    if (!startDate) {
      errors.push("startDate");
    }
    if (!endDate) {
      errors.push("endDate");
    }

    setErrorList(errors);

    if (errors.length === 0) {
      try {
        let coverImageUrl: string | undefined = undefined;

        // Fazer upload da imagem se houver
        if (coverImageFile) {
          coverImageUrl = await uploadCoverImage(coverImageFile);
        }

        const projectData: IProjectInput = {
          name: projectName,
          client: clientName,
          startDate: startDate,
          endDate: endDate,
          isFavorite: projectToUpdate.isFavorite,
          coverImage: coverImageUrl,
        };

        updateProject(
          { projectId: projectToUpdate.id, data: projectData },
          {
            onSuccess: () => {
              // Sucesso já é mostrado via updateSuccess
            },
            onError: () => {
              console.error("Erro ao atualizar o projeto");
            },
          },
        );
      } catch (error) {
        console.error("Erro no upload:", error);
        setErrorList(["coverImage"]);
      }
    }
  };
  return (
    <div className="flex justify-center px-6 py-10">
      <form
        className="w-full max-w-2xl rounded-2xl bg-gray-01 p-8"
        onSubmit={handleUpdateProject}
      >
        <div className="space-y-6">
          <div className={errorList.includes("projectName") ? "error" : ""}>
            <label
              className={`text-sm font-semibold text-blue-02 ${errorList.includes("projectName") ? "text-red-00" : ""}`}
              htmlFor="projectName"
            >
              Nome do projeto{" "}
              <span
                className={`font-light ${errorList.includes("projectName") ? "text-red-01" : "text-gray-00"}`}
              >
                {" "}
                (Obrigatório)
              </span>
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none ${errorList.includes("projectName") ? "border-red-01 text-red-01" : ""}`}
            />
            {errorList.includes("projectName") && (
              <p className="mt-1 text-sm text-red-01">
                Por favor, digite ao menos duas palavras
              </p>
            )}
          </div>

          <div className={errorList.includes("clientName") ? "error" : ""}>
            <label
              className={`text-sm font-semibold text-blue-02 ${errorList.includes("clientName") ? "text-red-00" : ""}`}
              htmlFor="clientName"
            >
              Cliente{" "}
              <span
                className={`font-light ${errorList.includes("clientName") ? "text-red-01" : "text-gray-00"}`}
              >
                (Obrigatório)
              </span>
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={`mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none ${errorList.includes("clientName") ? "border-red-01 text-red-01" : ""}`}
            />
            {errorList.includes("clientName") && (
              <p className="mt-1 text-sm text-red-01">
                Por favor, digite ao menos uma palavra
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={`text-sm font-semibold text-blue-02 ${errorList.includes("startDate") ? "text-red-00" : ""}`}
                htmlFor="startDate"
              >
                Data de Início{" "}
                <span
                  className={`font-light ${errorList.includes("startDate") ? "text-red-01" : "text-gray-00"}`}
                >
                  {" "}
                  (Obrigatório)
                </span>
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none ${errorList.includes("startDate") ? "border-red-01 text-red-01" : ""}`}
              />
              {errorList.includes("startDate") && (
                <p className="mt-1 text-sm text-red-01">
                  Selecione uma data válida
                </p>
              )}
            </div>
            <div>
              <label
                className={`text-sm font-semibold text-blue-02 ${errorList.includes("endDate") ? "text-red-00" : ""}`}
                htmlFor="endDate"
              >
                Data Final{" "}
                <span
                  className={`font-light ${errorList.includes("endDate") ? "text-red-01" : "text-gray-00"}`}
                >
                  {" "}
                  (Obrigatório)
                </span>
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none ${errorList.includes("endDate") ? "border-red-01 text-red-01" : ""}`}
              />
              {errorList.includes("endDate") && (
                <p className="mt-1 text-sm text-red-01">
                  Selecione uma data válida
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-blue-02">
              Capa do projeto
            </label>
            <div className="mt-1 flex flex-col items-center justify-center rounded-md border border-dashed border-gray-03 text-center">
              {coverImagePreview && (
                <div className="cover-image-display relative">
                  <button
                    className="absolute top-8 right-8 bg-white rounded-full p-2 shadow-default"
                    onClick={() => {
                      setCoverImageFile(null);
                      setCoverImagePreview(null);
                    }}
                  >
                    <Trash className="text-gray-00 w-5 h-5" />
                  </button>
                  <img src={coverImagePreview} alt="Cover preview" />
                </div>
              )}
              {!coverImagePreview && (
                <div className="text-gray-00 font-light py-6 px-8">
                  <div className="text-gray-00 font-light">
                    <Upload className="mx-auto mb-4" />
                    Escolha uma imagem .jpg ou .png no seu dispositivo
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUpdating}
                    className="mt-4 rounded-full border border-blue-02 px-6 py-2 text-blue-02 bg-white"
                  >
                    Selecionar
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        setCoverImageFile(file);
                        setCoverImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="mt-4 w-full rounded-full bg-blue-02 py-3 text-white hover:bg-blue-01 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Salvando..." : "Salvar projeto"}
          </button>
          {updateError && <p className="text-red-01">{updateError.message}</p>}
          {updateSuccess && (
            <p className="text-green-01">Projeto atualizado com sucesso!</p>
          )}
        </div>
      </form>
    </div>
  );
}
