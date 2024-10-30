import axios from "axios";

export default async function getTasks() {
  try {
    const response = await axios.get("http://localhost:5000/api/task");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
