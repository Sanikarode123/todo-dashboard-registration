import { useReducer, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoAtom } from "../recoil/todoAtom";
import useLocalStorage from "./useLocalStorage";

const ACTIONS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, { id: Date.now(), text: action.payload, completed: false }];

    case ACTIONS.EDIT:
      return todos.map(t =>
        t.id === action.payload.id
          ? { ...t, text: action.payload.text }
          : t
      );

    case ACTIONS.DELETE:
      return todos.filter(t => t.id !== action.payload);

    case ACTIONS.TOGGLE:
      return todos.map(t =>
        t.id === action.payload
          ? { ...t, completed: !t.completed }
          : t
      );

    default:
      return todos;
  }
}

export function useTodosReducer() {
  const [globalTodos, setGlobalTodos] = useRecoilState(todoAtom);

  
  const [todos, dispatch] = useReducer(reducer, globalTodos);

  
  useEffect(() => {
    setGlobalTodos(todos);
  }, [todos]);

  
  useLocalStorage("todos", todos);

  return { todos, dispatch, ACTIONS };
}
