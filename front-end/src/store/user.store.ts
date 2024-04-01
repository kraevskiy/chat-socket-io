import { APIUserType } from "@/types/api.types.ts";
import { create } from "zustand";


export interface IUserStore {
  user: null | APIUserType;
  setUser: (user: APIUserType | null) => void;
}

const storage = localStorage.getItem("chat-user");
const user = storage ? JSON.parse(storage) : null;

export const useUserStore = create<IUserStore>((set) => ({
  user,
  setUser: (user) => set({user})
}));

