import { create } from "zustand";
import { User } from "../types";

type Store = {
  user?: User;
  setUser: (user: User | undefined) => void;
  bookmarkFiles?: string[];
  setBookmarkFiles: (bookmarkFiles: string[]) => void;
};

export const useStore = create<Store>()((set) => ({
  setUser: (user) => set({ user: user }),
  setBookmarkFiles: (bookmarkFiles) => set({ bookmarkFiles: bookmarkFiles }),
}));
