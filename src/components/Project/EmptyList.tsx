import NewProjectButton from "./NewProjectButton";

export default function EmptyList() {
  return (
    <div
      className="empty-list-wrapper flex flex-col items-center justify-center bg-white-00 mx-[42px] my-[60px]"
      style={{ minHeight: "calc(100vh - 80px - 120px)" }}
    >
      <p className="font-semibold text-2xl mb-6 text-blue-01">Nenhum projeto</p>
      <p className="text-sm text-gray-00">
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>
      <div className="mt-6">
        <NewProjectButton />
      </div>
    </div>
  );
}
