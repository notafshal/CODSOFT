import axios from "axios";

async function getSingleUser({
  params,
}: {
  params: { id: string };
}): Promise<void> {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${params.id}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getSingleUser;
