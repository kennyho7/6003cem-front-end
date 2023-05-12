import APIHelper from "../base/APIHelper";
import { APIRequestGenerator } from "../base/APIHelper";
import { useState } from "react";

const module = "pets";

export default function usePets() {
  const [pets, setPets] = useState([]);

  async function getPets(token, params) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}`,
      params,
      token
    );
    try {
      const response = await APIHelper(
        "GET",
        url.toString(),
        null,
        true,
        headers
      );

      setPets(response);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getPets,
    pets,
  };
}
