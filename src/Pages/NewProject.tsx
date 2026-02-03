import ButtonVoltar from "@/components/ButtonVoltar";
import CreateProject from "@/components/Project/CreateProject";

export default function NewProject() {
  return (
    <div className="px-16 pb-8">
      <ButtonVoltar />
      <h1 className="text-2xl font-semibold text-blue-01">Novo Projeto</h1>
      <div className="border border-gray-03 mt-6 rounded-lg">
        <CreateProject />
      </div>
    </div>
  );
}
