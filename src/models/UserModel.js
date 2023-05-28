import APIHelper from "../base/APIHelper";
import { APIRequestGenerator } from "../base/APIHelper";
import { useState } from "react";
import ToastMessageHandler from "../components/ToastMessage";

const module = "users";

export default function useUser() {
  const [user, setUser] = useState({ userData: {}, token: "" });
  const [favorite, setFavorite] = useState([]);

  async function login(data) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/login`,
      null,
      null
    );
    try {
      const response = await APIHelper(
        "POST",
        url.toString(),
        data,
        true,
        headers
      );

      const { accessToken, data: userData } = response || {};

      setUser({ userData: userData, token: accessToken });

      return Promise.resolve(true);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      console.log(error);
    }
  }

  async function signUp(data) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/register`,
      null,
      null
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
      return Promise.reject(false);
    }
  }

  async function getFavorite(id) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/${id}/favorite`,
      null,
      null
    );
    try {
      const response = await APIHelper(
        "GET",
        url.toString(),
        null,
        true,
        headers
      );

      setFavorite(response);
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      console.log(error);
    }
  }

  async function addFavourite(data) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/favorite`,
      null,
      null
    );
    try {
      const response = await APIHelper(
        "POST",
        url.toString(),
        data,
        true,
        headers
      );
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      console.log(error);
    }
  }

  async function deleteFavourite(petId) {
    const { url, headers } = APIRequestGenerator(
      `${process.env.REACT_APP_HOST}/${module}/${petId}/favorite`,
      null,
      null
    );
    try {
      const response = await APIHelper(
        "DELETE",
        url.toString(),
        null,
        true,
        headers
      );
    } catch (error) {
      ToastMessageHandler(error.message, "error");
      console.log(error);
    }
  }

  function handleLogout() {
    setUser({ userData: {}, token: "" });
  }

  return {
    login,
    user,
    signUp,
    handleLogout,
    getFavorite,
    favorite,
    addFavourite,
    deleteFavourite,
  };
}
