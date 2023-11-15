"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type MultiFormData = {
  imageFiles: File[] | null;
  datasetName: string;
  animalType: string;
};

interface MultiFormDataContextType {
  multiFormData: MultiFormData;
  setMultiFormData: React.Dispatch<React.SetStateAction<MultiFormData>>;
}

const MultiFormDataContext = createContext<
  MultiFormDataContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const MultiFormDataProvider = ({ children }: Props) => {
  const [multiFormData, setMultiFormData] = useState<MultiFormData>({
    imageFiles: null,
    datasetName: "",
    animalType: "",
  });

  return (
    <MultiFormDataContext.Provider value={{ multiFormData, setMultiFormData }}>
      {children}
    </MultiFormDataContext.Provider>
  );
};

export const useMultiFormData = () => {
  const context = useContext(MultiFormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
