import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

export default function ButtonVoltar({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick ? onClick : () => navigate(-1)}
      className="flex items-center text-blue-02 text-sm"
    >
      <GoArrowLeft className="mr-2" />
      Voltar
    </button>
  );
}
