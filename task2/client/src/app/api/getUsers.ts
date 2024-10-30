import axios from "axios";

export default async function getUsers() {
  try {
    const response = await axios.get("http://localhost:5000/api/users");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
