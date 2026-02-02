import { GoTrash } from "react-icons/go";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  projectName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function Modal({
  isOpen,
  title,
  description,
  projectName,
  onCancel,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white px-8 pb-8 pt-10 text-center shadow-xl">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-02 text-white shadow-lg">
            <GoTrash className="h-5 w-5" />
          </div>
        </div>

        <h2 className="text-blue-01 text-lg font-semibold">{title}</h2>
        <div className="my-4 h-px w-full bg-gray-03" />

        <p className="text-sm text-gray-00">{description}</p>
        <p className="mt-2 text-base font-semibold text-blue-01">
          {projectName}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-full border border-blue-02 px-6 py-2 text-blue-02 hover:bg-blue-02 hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-full bg-blue-02 px-6 py-2 text-white hover:bg-blue-01"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
