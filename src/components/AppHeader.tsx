import { useLocation } from "react-router-dom";
import { useProjectsApi } from "@/hooks/useProjectsApi";
import ProjectSearch from "./Project/ProjectSearch";

export default function AppHeader() {
  const location = useLocation();
  const { projects, isProjectsLoading } = useProjectsApi();
  const isProjectsPage =
    location.pathname === "/" && !isProjectsLoading && projects.length > 0;
  return (
    <div className="grid h-header grid-cols-3 items-center bg-blue-00 px-16 shadow-header mb-16">
      <div className="logo-wrapper col-start-2 flex items-center justify-center gap-3">
        <img src="/img/gdp-logo.svg" alt="GDP Logo" />
        <p className="text-main-title text-gray-01 w-[109px]">
          Gerenciador de Projetos
        </p>
      </div>
      {isProjectsPage && <ProjectSearch />}
    </div>
  );
}
