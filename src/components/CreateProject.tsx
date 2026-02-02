import { Upload } from "./Icons";
export default function CreateProject() {
  return (
    <div className="flex justify-center px-6 py-10">
      <form className="w-full max-w-2xl rounded-2xl bg-gray-01 p-8">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-blue-02">
              Nome do projeto{" "}
              <span className="text-gray-00 font-light">(Obrigatório)</span>
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-blue-02">
              Cliente{" "}
              <span className="text-gray-00 font-light">(Obrigatório)</span>
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blue-02">
                Data de Início{" "}
                <span className="text-gray-00 font-light">(Obrigatório)</span>
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blue-02">
                Data Final{" "}
                <span className="text-gray-00 font-light">(Obrigatório)</span>
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-03 px-4 py-2 text-base text-gray-02 focus:border-blue-02 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-blue-02">
              Capa do projeto
            </label>
            <div className="mt-1 flex flex-col items-center justify-center rounded-md border border-dashed border-gray-03 px-6 py-8 text-center">
              <div className="text-gray-00 font-light">
                <Upload className="mx-auto mb-4" />
                Escolha uma imagem .jpg ou .png no seu dispositivo
              </div>
              <button
                type="button"
                className="mt-4 rounded-full border border-blue-02 px-6 py-2 text-blue-02 bg-white"
              >
                Selecionar
              </button>
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
