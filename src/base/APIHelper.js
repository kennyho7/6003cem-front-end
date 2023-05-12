import qs from "qs";

const DEFAULT_HEADERS = {
  Accept: "application/json, text/plain, /",
  "Content-Type": "application/json",
};

function APIHelper(method, url, data, isJSON = true, headers = null) {
  if (!headers) {
    headers = {
      Accept: "application/json, text/plain, /",
      "Content-Type": "application/json",
    };
  }
  let isFailed = false;

  const options = { method, headers };

  if (data && isJSON) options.body = JSON.stringify(data);

  if (!isJSON) options.body = data;

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 202) {
          if (res.headers.get("Content-Type").includes("text/html")) {
            return res.text();
          }

          return res.json();
        }
        isFailed = true;
        return res.json();
      })
      .then((response) => {
        if (isFailed) throw response;
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const APIRequestGenerator = (rawURL, params = null, token = null) => {
  let url = new URL(rawURL);
  if (params && typeof params === "object") {
    url.search = qs.stringify(params, { arrayFormat: "brackets" });
  }
  const headers = { ...DEFAULT_HEADERS };
  if (token) headers.Authorization = `Bearer ${token}`;
  url = url.toString();
  return { url, headers };
};

export { DEFAULT_HEADERS, APIRequestGenerator };

export default APIHelper;
