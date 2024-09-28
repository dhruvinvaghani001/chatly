/*
    Handles the request to the API.
    @param {function} api - The API function to handle request.
    @param {function} setLoading - The function to set the loading state.
    @param {function} onSucess - The function to handle the success response.
    @param {function} onError - The function to handle the error response.
    @returns {void} - Hanldes api call
*/

const requestHandler = async (api, setLoading, onSuccess, onError) => {
  setLoading && setLoading(true);
  try {
    const response = await api();
    const { data } = response;
    // console.log(data);
    if (data?.success) {
      onSuccess(data);
    }
  } catch (error) {
    if ([401, 403].includes(error?.response?.data?.statusCode)) {
      onError(error?.message || "please login again !");
      if (isBrowser) window.location.href = "/login";
      localStorage.removeItem("user");
    }
    onError(error?.message || "something went wrong!!");
  } finally {
    setLoading && setLoading(false);
  }
};

export const isBrowser = typeof window !== "undefined";

export { requestHandler };
