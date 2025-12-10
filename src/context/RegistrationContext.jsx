import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {},
    address: {},
    documents: null,
  });

  const update = (stepKey, data) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: data,
    }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, update }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
