
import { atom } from "recoil";

export const registrationAtom = atom({
  key: "registrationAtom",
  default: {
    personal: {},
    address: {},
    documents: null,
  },
});
