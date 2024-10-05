import { encryptStorage } from "@/lib/storage";
import axios from "axios";

/*create a axios instance with server base URL*/
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: import.meta.env.VITE_CREDENTIAL === true ? true : false,
  timeout: 120000,
});

/*
 * add interceptor to all outgoing request to backend
 * to add Authorizatoin header in all requests ,
 */
axiosInstance.interceptors.request.use(
  function (config) {
    const user = encryptStorage.getItem("user");
    config.headers.Authorization = `Bearer ${user?.acessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    error.message = error?.response?.data?.message;
    return Promise.reject(error);
  }
);

const signUp = (data) => {
  return axiosInstance.post("/user/signup", data);
};

const login = (data) => {
  return axiosInstance.post("/user/login", data);
};

/**
 *
 * @returns logout a user
 */
const logout = () => {
  return axiosInstance.post("/user/logout");
};

/**
 *
 * @returns available users on platform to chat
 */
const searchAvailableUser = () => {
  return axiosInstance.get("/chat/available-user");
};

/**
   * Creates a one-to-one chat with the specified user.
   * @param {ObjectId} userId - The ID of the user to create the chat with.
     @returns {Promise} - A promise that resolves to the response of the API call.
*/
const createOneToOneChat = (userId) => {
  return axiosInstance.post(`/chat/c/${userId}`);
};

/**
 * get all chats in which user is part of it ;
 * @returns a promise that resolve to the response of the api call
 */
const getAllChats = () => {
  return axiosInstance.get("/chat");
};

/**
 * Create group chat
 * @params : data ({name , members})
 * @returns a promise that resolve the response of api call
 */
const createGroup = (data) => {
  return axiosInstance.post("/chat/group", data);
};

/**
 * Handles api call for get all messages for particular chat id
 @params : chatId
 @returns a promise that resolve the response of api call
 */
const getMessagesByChatId = (chatId) => {
  return axiosInstance.get(`/message/${chatId}`);
};

/**
 * Handles api call for send message in chat ;
 * @param {data,chatId} {data:string of message content} chatID : in which chat you want to send message
 */
const sendMessageInChat = ({ data, chatId }) => {
  return axiosInstance.post(`/message/${chatId}`, data);
};

/**
 * Handles api call for delete one to one chat !
 * @param {string} chatId
 * @returns
 */
const deleteChats = ({ type, chatId }) => {
  return axiosInstance.delete(
    `chat/${type == false ? "c" : "group"}/${chatId}`
  );
};

/**
 * Handles request to leave a partiular group:
 * @param {string} chatId
 * @returns
 */
const leaveGroup = (chatId) => {
  return axiosInstance.patch(`chat/group/leave/${chatId}`);
};
/**
 * Handles a request to remove memeber from group:
 * @param {} (chatId,memberId)
 * @returns return a promise
 */
const removeMemberFromGroup = ({ chatId, memberId }) => {
  return axiosInstance.patch(`chat/group/${chatId}/remove/${memberId}`);
};

/**
 * Handles a api call for add memeber in group !
 * @param {string,string} {chatId,memberId}
 * @returns a promise which resolve add functionality in group
 */
const addMemberInGroup = ({ chatId, data }) => {
  return axiosInstance.patch(`chat/group/${chatId}/add`, data);
};

const getUnreadMessages = () => {
  return axiosInstance.get(`unread-message/`);
};

const deleteUnreadMessages = (chatId) => {
  return axiosInstance.delete(`unread-message/${chatId}`);
};

const addunreadMessage = ({ data }) => {
  return axiosInstance.post(`unread-message/add`, data);
};

export {
  signUp,
  login,
  logout,
  searchAvailableUser,
  createOneToOneChat,
  getAllChats,
  createGroup,
  getMessagesByChatId,
  sendMessageInChat,
  deleteChats,
  leaveGroup,
  removeMemberFromGroup,
  addMemberInGroup,
  getUnreadMessages,
  deleteUnreadMessages,
  addunreadMessage,
};
