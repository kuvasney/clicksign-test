export interface IProject {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage?: string;
}

export type TSortOrder = "alphabetical" | "startDate" | "endDate" | "favorite";
