import api from "./axios";

export const uploadResume = (formData) =>
  api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getResume = () =>
  api.get("/resume/me");

export const reanalyzeResume = () =>
  api.put("/resume/reanalyze");

export const deleteResume = () =>
  api.delete("/resume");