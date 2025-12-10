import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const ProfileContext = createContext();

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  work: "",       
  country: "",    
  avatarUrl: "",
};


function profileReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return { ...state, ...action.payload };
    case "UPDATE":
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      try {
        dispatch({ type: "LOAD", payload: JSON.parse(stored) });
      } catch (e) {
        console.error("Failed to parse profile from localStorage", e);
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(state));
  }, [state]);

  
  const updateProfile = useCallback(
    (payload) => {
      dispatch({ type: "UPDATE", payload });
    },
    [dispatch]
  );

  const resetProfile = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      profile: state,
      updateProfile,
      resetProfile,
    }),
    [state, updateProfile, resetProfile]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
