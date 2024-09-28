import { create } from "zustand";

const useMessages = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useMessages;
