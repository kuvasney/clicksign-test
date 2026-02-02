import { useState, useRef } from "react";
import { Trash, Upload } from "./Icons";
export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [errorList, setErrorList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setProjectName("");
    setClientName("");
    setStartDate("");
    setEndDate("");
    setCoverImage(null);
    setErrorList([]);
  };

  const handleNewProject = (e: React.FormEvent) => {
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
      // Submit form logic here
      console.log("Project Created:", {
        projectName,
        clientName,
        startDate,
        endDate,
        coverImage,
      });
      clearForm();
    }
  };
  return (
    <div className="flex justify-center px-6 py-10">
      <form
        className="w-full max-w-2xl rounded-2xl bg-gray-01 p-8"
        onSubmit={handleNewProject}
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
              {coverImage && (
                <div className="relative ">
                  <button
                    className="absolute top-8 right-8 bg-white rounded-full p-2 shadow-default"
                    onClick={() => setCoverImage(null)}
                  >
                    <Trash className="text-gray-00 w-5 h-5" />
                  </button>
                  <img src={URL.createObjectURL(coverImage)} />
                </div>
              )}
              {!coverImage && (
                <div className="text-gray-00 font-light py-6 px-8">
                  <div className="text-gray-00 font-light">
                    <Upload className="mx-auto mb-4" />
                    Escolha uma imagem .jpg ou .png no seu dispositivo
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
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
                        setCoverImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-blue-02 py-3 text-white hover:bg-blue-01"
          >
            Salvar projeto
          </button>
        </div>
      </form>
    </div>
  );
}
