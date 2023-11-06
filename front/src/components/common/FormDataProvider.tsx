"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  conceptId: number;
  breed: string;
  imageFile: File | null;
};

type FormDataContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const FormDataProvider = ({ children }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    conceptId: 0,
    breed: "",
    imageFile: null,
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
