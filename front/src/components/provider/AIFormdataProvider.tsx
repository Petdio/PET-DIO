"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AIFormData {
  modelId: number;
  conceptId: number;
}

interface AIFormDataContextType {
  data: AIFormData;
  setModelId: (id: number) => void;
  setConceptId: (id: number) => void;
}

const defaultContext: AIFormDataContextType = {
  data: {
    modelId: -1,
    conceptId: -1,
  },
  setModelId: (id: number) => {},
  setConceptId: (id: number) => {},
};

const AIFormDataContext = createContext(defaultContext);

export default function AIFormDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<AIFormDataContextType>(defaultContext);

  const setModelId = (id: number) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        modelId: id,
      },
    }));
  };

  const setConceptId = (id: number) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        conceptId: id,
      },
    }));
  };

  const aiCtx: AIFormDataContextType = {
    data: state.data,
    setModelId,
    setConceptId,
  };

  return (
    <AIFormDataContext.Provider value={aiCtx}>
      {children}
    </AIFormDataContext.Provider>
  );
}

export const useAIFormData = () => {
  const context = useContext(AIFormDataContext);
  if (!context) {
    throw new Error("useAIFormData must be used within a AIFormDataProvider");
  }
  return context;
};
