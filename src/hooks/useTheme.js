import { useRecoilState } from "recoil";
import { themeAtom } from "../recoil/themeAtom";
import useLocalStorage from "./useLocalStorage";

export function useTheme() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useLocalStorage("theme", theme);

  return { theme, toggleTheme };
}
