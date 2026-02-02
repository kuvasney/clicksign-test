export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  coverImage?: string;
}
