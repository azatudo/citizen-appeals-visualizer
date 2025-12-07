import axios from "axios";

export async function loadData() {
  try {
    const resp = await axios.get("/data.json");
    return resp.data;
  } catch (err) {
    console.error("data.json not loaded", err);
    return [];
  }
}

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU");
}