import {
  addChat,
  deleteChat,
  removeUnnreadMessages,
  setSelectedChat,
  updateChat,
  useChatContext,
} from "@/context/chatSlice";
import { useSocketContext } from "@/context/socket-context/socketContext";
import useMessages from "@/context/zustand";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useListenChat() {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { messages, setMessages } = useMessages();
  const { selectedChat } = useChatContext();

  useEffect(() => {
    socket?.on("new chat", (payload) => {
      dispatch(addChat({ chat: payload }));
    });
    return () => {
      socket?.off("new chat");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("chat-update", (chat) => {
      dispatch(updateChat({ chat: chat }));
    });

    return () => {
      socket?.off("chat-update");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("group-update", (chat) => {
      dispatch(updateChat({ chat: chat }));
      // console.log("hello from conditional");
      // console.log(selectedChat);
      // console.log(chat._id);
      // console.log(selectedChat?._id == chat._id.toString());

      if (selectedChat?._id == chat._id.toString()) {
        // console.log("hello");
        dispatch(setSelectedChat({ chat: chat }));
      }
    });

    return () => {
      socket?.off("group-update");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("delete-chat", (chat) => {
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
