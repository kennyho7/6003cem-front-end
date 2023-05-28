import APIHelper from "../base/APIHelper";
import { APIRequestGenerator } from "../base/APIHelper";
import { useState } from "react";
import ToastMessageHandler from "../components/ToastMessage";

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

      return Promise.resolve(true);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      return Promise.reject(error);
    }
  }

  async function createPet(data, token) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}`,
      null,
      token
    );
    try {
      const response = await APIHelper(
        "POST",
        url.toString(),
        data,
        true,
        headers
      );
      return Promise.resolve(true);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      return Promise.reject(error);
    }
  }

  async function editPet(data, token) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/${data.id}`,
      null,
      token
    );
    try {
      const response = await APIHelper(
        "PATCH",
        url.toString(),
        data,
        true,
        headers
      );
      return Promise.resolve(true);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      return Promise.reject(error);
    }
  }

  async function deletePet(id, token) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/${id}`,
      null,
      token
    );
    try {
      const response = await APIHelper(
        "DELETE",
        url.toString(),
        null,
        true,
        headers
      );
      return Promise.resolve(true);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      return Promise.reject(error);
    }
  }

  return {
    getPets,
    pets,
    createPet,
    editPet,
    deletePet,
  };
}
