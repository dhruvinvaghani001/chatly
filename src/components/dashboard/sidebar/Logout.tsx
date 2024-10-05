import { addunreadMessage } from "@/api";
import { useAuthContext } from "@/context/authSlice";
import { useChatContext } from "@/context/chatSlice";
import { requestHandler } from "@/lib/requestHandler";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut as storeLogout } from "@/context/authSlice";
import { encryptStorage } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";

const Logout = (props) => {
  const { unreadMessages } = useChatContext();
  const { userData } = useAuthContext();

  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnreadMessages = async () => {
    const mapi = new Map();
    unreadMessages.forEach((message) => {
      if (!message.fromDb) {
        if (!mapi.has(message.chat)) {
          mapi.set(message.chat, [message._id]);
        }
        mapi.get(message.chat).push(message._id);
      }
    });

    const result = [];

    mapi.forEach((messageIds, chatId) => {
      const uniqueMessageIds = [...new Set(messageIds)];
      result.push({
        chatId: chatId,
        messageIds: uniqueMessageIds,
      });
    });

    // console.log(result);

    const data = {
      values: result,
      userId: userData._id,
    };
    console.log(data);
    return new Promise((resolve, reject) => {
      requestHandler(
        async () => await addunreadMessage({ data }),
        setLoggingOut,
        (res) => {
          console.log("Unread messages stored successfully:", res);
          resolve(res);
        },
        (err) => {
          console.error("Error storing unread messages:", err);
          reject(err);
        }
      );
    });
  };

  const handleLogout = async (e) => {
    await handleUnreadMessages();
    dispatch(storeLogout());
    setTimeout(() => {
      navigate("/login");
      setTimeout(() => {
        navigate(0);
      }, 100);
    }, 500);
  };

  return (
    <>
      <Button
        variant={"ghost"}
        className="py-2 px-2.5 ml-2"
        onClick={handleLogout}
      >
        {!loggingOut ? (
          <LogOut className="w-5"></LogOut>
        ) : (
          <Loader2 className="animate-spin w-5 ml-1" />
        )}
      </Button>
    </>
  );
};

export default Logout;
