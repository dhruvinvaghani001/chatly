import {
  addChat,
  deleteChat,
  removeUnnreadMessages,
  setSelectedChat,
  updateChat,
} from "@/context/chatSlice";
import { useSocketContext } from "@/context/socket-context/socketContext";
import useMessages from "@/context/zustand";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useListenChat() {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { messages, setMessages } = useMessages();

  useEffect(() => {
    socket?.on("new chat", (payload) => {
      console.log("NEW CHAT CREATED SOCKET EVENT");
      dispatch(addChat({ chat: payload }));
    });
    return () => {
      socket?.off("new chat");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("chat-update", (chat) => {
      console.log("CHAT UPDATE SOCKET EVENT");
      dispatch(updateChat({ chat: chat }));
    });

    return () => {
      socket?.off("chat-update");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("group-update", (chat) => {
      console.log("GROUP CHAT UPDATE SOCKET EVENT");
      dispatch(updateChat({ chat: chat }));
      dispatch(setSelectedChat({ chat: chat }));
    });

    return () => {
      socket?.off("group-update");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("delete-chat", (chat) => {
      console.log("CHAT DELETE SOCKET EVENT!");
      dispatch(deleteChat({ chat: chat }));
      dispatch(removeUnnreadMessages({ chatId: chat._id.toString() }));
      dispatch(setSelectedChat({ chat: null }));
      setMessages([]);
    });
    return () => {
      socket?.off("delete-chat");
    };
  }, [socket, dispatch, setMessages]);
}
