import { create } from "zustand";
import { APIMessageType, APIUsersTypeItem } from "@/types/api.types.ts";

export interface IConversationStore {
  selectedConversation: null | APIUsersTypeItem;
  setSelectedConversation: (conversation: null | APIUsersTypeItem) => void;
  messages: APIMessageType[];
  setMessages: (message: APIMessageType[]) => void;
}

export const useConversationStore = create<IConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({messages})
}));
