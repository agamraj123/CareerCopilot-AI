import api from "./axios";

export const generateCoverLetter = (data) =>
    api.post("/cover-letter", data);

export const getCoverLetters = () =>
    api.get("/cover-letter/history");

export const getCoverLetter = (id) =>
    api.get(`/cover-letter/${id}`);

export const deleteCoverLetter = (id) =>
    api.delete(`/cover-letter/${id}`);