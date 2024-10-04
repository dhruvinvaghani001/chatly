import { GroupThumbnail } from "@/assets";
import { AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/authSlice";
import {
  removeUnnreadMessages,
  setSelectedChat,
  useChatContext,
} from "@/context/chatSlice";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { requestHandler } from "@/lib/requestHandler";
import { deleteUnreadMessages } from "@/api";
import toast from "react-hot-toast";
import DialogPopUp from "@/components/ui/dialog-popup";
import { Button } from "@/components/ui/button";
import { PenSquare, Plus } from "lucide-react";
import AddChatForm from "./AddChatForm";
import Logout from "./Logout";

const Chat = ({ chat }) => {
  const { selectedChat, unreadMessages } = useChatContext();
  const { userData } = useAuthContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isGroup = chat?.isGroup;
  const isSelectedChat = selectedChat?._id == chat._id;

  const oneToOneChatMemeber = chat?.members.filter(
    (item) => item.username != userData.username
  )[0];

  const notificationCount = unreadMessages?.filter(
    (message) => message.chat.toString() == chat?._id.toString()
  ).length;

  const handleSelectChat = () => {
    dispatch(setSelectedChat({ chat: chat }));
    requestHandler(
      async () => await deleteUnreadMessages(chat?._id),
      setLoading,
      (res) => {},
      (err) => {
        toast.error(err);
      }
    );
    dispatch(removeUnnreadMessages({ chatId: chat?._id.toString() }));
  };

  return (
    <>
      {!isGroup ? (
        <>
          <div
            className={cn(
              " rounded-lg flex justify-center items-center",
              isSelectedChat && "bg-muted-foreground",
              notificationCount && "border-2  border-destructive"
            )}
            onClick={handleSelectChat}
          >
            <Avatar className="w-12 h-12 flex justify-center items-center relative">
              <AvatarImage src={oneToOneChatMemeber?.avatar} />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                </div>
              )}
              <AvatarFallback />
            </Avatar>
          </div>
        </>
      ) : (
        <>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center",
              isSelectedChat && "bg-muted-foreground",
              notificationCount && "border-2  border-destructive"
            )}
            onClick={handleSelectChat}
          >
            <Avatar className="w-12 h-12 flex items-center justify-center relative">
              <AvatarImage src={GroupThumbnail} className="w-6  " />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                </div>
              )}

              <AvatarFallback />
            </Avatar>
          </div>
        </>
      )}
    </>
  );
};

const MobileSidebar = ({ chats }) => {
  console.log("from mobile sidebar");

  return (
    <>
      <div className="w-16 md:hidden px-2 border-r-2  flex flex-col items-center py-4 space-y-4">
        <h2 className="text-xs font-semibold ">Chats</h2>
        <Logout />
        <DialogPopUp
          TriggerComponent={
            <Button variant="ghost" size="icon">
              <PenSquare className="h-5 w-5" />
            </Button>
          }
          ContentCompnent={AddChatForm}
        />
        {chats.map((chat) => (
          <Chat chat={chat} key={chat?._id} />
        ))}
      </div>
    </>
  );
};

export default MobileSidebar;
