import { atom } from "recoil";

const LOCAL_KEY = "todoTasks_v1";

export const tasksAtom = atom({
  key: "tasksAtom",
  default: [],
});

