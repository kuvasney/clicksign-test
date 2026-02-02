import { Route, Routes } from "react-router-dom";
import AppHeader from "@/components/AppHeader.tsx";
import Projects from "./Pages/Projects";
import NewProject from "./Pages/NewProject";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper bg-gray-01 height-full min-h-screen">
      <AppHeader />
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/new-project" element={<NewProject />} />
      </Routes>
    </div>
  );
}

export default App;
