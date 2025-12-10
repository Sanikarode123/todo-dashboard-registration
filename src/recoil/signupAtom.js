import { atom } from "recoil";

export const signupAtom = atom({
  key: "signupAtom",
  default: {
    email: "",
    password: "",
    otp: "",
    generatedOtp: null,
    error: "",
  },
});
