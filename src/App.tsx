import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppHeader from "@/components/AppHeader.tsx";
import Projects from "./Pages/Projects";
import NewProject from "./Pages/NewProject";
import EditProject from "./Pages/EditProject";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-wrapper bg-gray-01 h-full min-h-screen">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
