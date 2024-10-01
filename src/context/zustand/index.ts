import { create } from "zustand";
import { User } from "../authSlice";

interface AttachmentFiles {
  _id: string;
  url: string;
  localPath: string;
}

interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: string;
  attachmentFiles: AttachmentFiles[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface MessagesState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useMessages = create<MessagesState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useMessages;
