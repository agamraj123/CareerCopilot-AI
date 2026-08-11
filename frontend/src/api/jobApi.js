import api from "./axios";

export const analyzeJob = (data) =>
    api.post("/job/match", data);

export const getJobHistory = () =>
    api.get("/job/history");

export const getJob = (id) =>
    api.get(`/job/${id}`);

export const updateJobStatus = (id, data) =>
    api.patch(`/job/${id}/status`, data);

export const deleteJob = (id) =>
    api.delete(`/job/${id}`);