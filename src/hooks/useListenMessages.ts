import { setUnreadMessages, useChatContext } from "@/context/chatSlice";
import { useSocketContext } from "@/context/socket-context/socketContext";
import useMessages from "@/context/zustand";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { selectedChat } = useChatContext();
  const { messages, setMessages } = useMessages();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hello");
    socket?.on("new message", (message) => {
      console.log("new MESSAGE EVBENT");
      if (selectedChat == null) {
        dispatch(setUnreadMessages({ message: message }));
      }
      if (message.chat == selectedChat?._id) {
        setMessages([...messages, message]);
      } else {
        console.log("event for unreadmesage");
        dispatch(setUnreadMessages({ message: message }));
      }
    });

    return () => {
      socket?.off("new message");
    };
  }, [socket, selectedChat, selectedChat?._id]);
}
