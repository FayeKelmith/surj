import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  email: string;
  contact: string;
  name: string;
};

type Action = {
  updateEmail: (email: State["email"]) => void;
  updateContact: (contact: State["contact"]) => void;
  updateName: (name: State["name"]) => void;
};

export const useUser = create<State & Action>((set) => ({
  email: "",
  contact: "",
  name: "",
  updateEmail: (email: string) => set(() => ({ email: email })),
  updateContact: (contact: string) => set(() => ({ contact: contact })),
  updateName: (name: string) => set(() => ({ name: name })),
}));

type tokenState = {
  accessToken: string;
  refreshToken: string;
};
type tokenAction = {
  setAccessToken: (token: tokenState["accessToken"]) => void;
  setRefreshToken: (refreshToken: tokenState["refreshToken"]) => void;
};
export const useToken = create<tokenState & tokenAction>((set) => ({
  accessToken: "",
  refreshToken: "",
  setAccessToken: (accessToken: string) =>
    set(() => ({ accessToken: accessToken })),
  setRefreshToken: (refreshToken: string) =>
    set(() => ({ refreshToken: refreshToken })),
}));
