// src/api/events.ts
import axios from "axios";

export async function getCalendlyEvents() {
  return axios.get("/events");
}


export async function getStoredEvents() {
  return axios.get("/events/stored");
}
