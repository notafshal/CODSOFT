import axios from "axios";
import React, { ReactNode } from "react";

function getSingleUser({ params }: { params: ReactNode | null | undefined }) {
  try {
    axios.get(`http://localhost:5000/api/users/${params.id}`);
  } catch (err) {
    console.error(err);
  }
}

export default getSingleUser;
