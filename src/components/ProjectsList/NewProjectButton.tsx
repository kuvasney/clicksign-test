import { useNavigate } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";

export default function NewProjectButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-project");
  };

  return (
    <button onClick={handleClick} className="btn-default text-xl py-1 px-6">
      <GoPlusCircle className="mr-2 size-5" />
      <span>Novo projeto</span>
    </button>
  );
}
