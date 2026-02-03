import { http, HttpResponse, delay } from "msw";
import MOCK_PROJECTS from "./projectsMock.json";
import MOCK_PROJECT from "./projectMock.json";

const API_BASE_URL = "/api";

export const handlers = [
  http.get(`${API_BASE_URL}/projects`, async () => {
    await delay(1000);
    return HttpResponse.json(MOCK_PROJECTS);
  }),

  // http.post(`${API_BASE_URL}/projects`, async () => {
  //   // await delay(2000);
  //   return HttpResponse.json(MOCK_NEW_PROJECT);
  // }),

  http.put(`${API_BASE_URL}/projects/*`, async () => {
    await delay(500);
    return HttpResponse.json(MOCK_PROJECT);
  }),

  http.delete(`${API_BASE_URL}/projects/*`, async () => {
    await delay(500);
    return HttpResponse.json(MOCK_PROJECT);
  }),
];
