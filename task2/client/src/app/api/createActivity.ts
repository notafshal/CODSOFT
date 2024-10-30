/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function createActivity(activityData: any) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/activities`,
      activityData,
      { headers: { Authorization: `Bearer ${activityData.token}` } }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
