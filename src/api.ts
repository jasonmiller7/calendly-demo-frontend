import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
});

export const getCalendlyEvents = () => API.get("/events");
export const getStoredEvents = () => API.get("/events/stored");
