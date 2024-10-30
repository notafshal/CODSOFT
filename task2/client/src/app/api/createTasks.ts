/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function createTasks(taskData: any) {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/task",
      taskData,
      { headers: { Authorization: `Bearer ${taskData.token}` } }
    );
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
