import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";

import MobileSidebar from "./MobileSidebar";
import useWindowsize from "@/hooks/useWindowsize";
import { requestHandler } from "@/lib/requestHandler";
import { setChats, useChatContext } from "@/context/chatSlice";
import toast from "react-hot-toast";
import {  getAllChats } from "@/api";
import { useDispatch } from "react-redux";
import AllChats from "./AllChats";
import { Loader2, LogOut, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogPopUp from "@/components/ui/dialog-popup";
import AddChatForm from "./AddChatForm";
import Logout from "./Logout";

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowsize();
  const dispatch = useDispatch();

  const { chats } = useChatContext();

  console.log(chats);

  useEffect(() => {
    requestHandler(
      async () => await getAllChats(),
      setLoading,
      (res) => {
        const { data } = res;
        console.log(res);
        dispatch(setChats({ chat: data }));
      },
      (err) => {
        toast.error(err);
      }
    );
  }, []);


  return (
    <>
      {width < 768 && <MobileSidebar chats={chats} />}
      {width >= 768 && (
        <div className="hidden md:flex md:w-80 flex-col  border-r border-muted-foreground">
          <div className="p-4 border-b  border-muted-foreground flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chats</h2>
            <div className="flex items-center">
              <div className="flex space-x-2">
                <DialogPopUp
                  TriggerComponent={
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-5 w-5" />
                    </Button>
                  }
                  ContentCompnent={AddChatForm}
                />
              </div>
              <Logout />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {loading ? (
              <div className="flex justify-center mt-4">
                <Loader2 className="animate-spin flex" />
              </div>
            ) : (
              <AllChats chats={chats} />
            )}
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default Sidebar;
