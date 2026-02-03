export interface IProject {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage?: string | null;
}

export interface IProjectInput {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage?: string | null; // URL da imagem após upload
}

export type TSortOrder = "alphabetical" | "startDate" | "endDate" | "favorite";
