import { atom } from "recoil";

export const dashboardAtom = atom({
  key: "dashboardAtom",
  default: {
    view: "myday",
    adding: false,
    newTitle: "",
    newNote: "",
  },
});
