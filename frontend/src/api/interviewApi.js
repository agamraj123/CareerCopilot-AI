import api from "./axios";

// Generate interview preparation
export const generateInterview = (data) =>
  api.post("/interview/generate", data);

// Get interview history
export const getInterviewHistory = () =>
  api.get("/interview/history");

// Get single interview preparation
export const getInterview = (id) =>
  api.get(`/interview/${id}`);

// Delete interview preparation
export const deleteInterview = (id) =>
  api.delete(`/interview/${id}`);