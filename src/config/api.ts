export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken") || ""}`,
  },
};

// Função para obter headers com token dinâmico
export const getAuthHeaders = (): HeadersInit => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

interface ApiEndpoints {
  projects: string;
}

// Endpoints da API
export const API_ENDPOINTS: ApiEndpoints = {
  projects: "/api/projects",
};
