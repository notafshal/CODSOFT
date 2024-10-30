/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getSingleTask(taskId: string) {
  try {
    const result = await axios.get(`http://localhost:5000/api/task/${taskId}`);
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
