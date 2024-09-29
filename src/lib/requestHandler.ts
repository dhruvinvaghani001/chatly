/*
    Handles the request to the API.
    @param {function} api - The API function to handle request.
    @param {function} setLoading - The function to set the loading state.
    @param {function} onSucess - The function to handle the success response.
    @param {function} onError - The function to handle the error response.
    @returns {void} - Hanldes api call
*/

import { encryptStorage } from "./storage";

const requestHandler = async (api, setLoading, onSuccess, onError) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  setLoading && setLoading(true);
  try {
    const response = await api();

    const { data } = response;

    if (data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    if ([401, 403].includes(error?.response?.data?.statusCode)) {
      onError(error?.message || "please login again !");
      if (isBrowser) window.location.href = "/login";
      encryptStorage.removeItem("user");
    }
    // console.log("error", error);
    onError(error?.message || "something went wrong!!");
  } finally {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setLoading && setLoading(false);
  }
};

export const isBrowser = typeof window !== "undefined";

export { requestHandler };
