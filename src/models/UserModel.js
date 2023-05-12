import APIHelper from "../base/APIHelper";
import { APIRequestGenerator } from "../base/APIHelper";
import { useState } from "react";

const module = "users";

export default function useUser() {
  const [user, setUser] = useState({ userData: {}, token: "" });

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

      const { accessToken } = response || {};

      setUser({ ...user, token: accessToken });

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(false);
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
      return Promise.reject(false);
    }
  }

  return {
    login,
    user,
    signUp,
  };
}
