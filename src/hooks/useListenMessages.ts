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
    socket?.on("new message", (message) => {
      if (selectedChat == null) {
        dispatch(setUnreadMessages({ message: message }));
      }
      if (message.chat == selectedChat?._id) {
        console.log("MESAGE FOR SELECTED CHAT");
        console.log("messages");
        console.log(messages);
        console.log("message");
        console.log(message);

        setMessages([...messages, message]);
      } else {
        console.log("event for unreadmesage");
        dispatch(setUnreadMessages({ message: message }));
      }
    });

    return () => {
      socket?.off("new message");
    };
  }, [
    socket,
    dispatch,
    messages,
    selectedChat,
    selectedChat?._id,
    setMessages,
  ]);
}
