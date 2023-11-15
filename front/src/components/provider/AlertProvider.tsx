"use client";

import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";

// 알림창 Context의 State
interface State {
  show: boolean;
  isSuccessed: boolean;
  message: string;
  successed: (message: string) => void;
  failed: (message: string) => void;
  close: () => void;
}

// 최초 useState에 들어가는 값
const defaultState: State = {
  show: false,
  isSuccessed: false,
  message: "",
  successed: (message: string) => {},
  failed: (message: string) => {},
  close: () => {},
};

const alertContext = createContext(defaultState);

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(defaultState);

  // 작업 성공
  const successed = (message: string) => {
    setState((prev) => ({
      ...prev,
      show: true,
      isSuccessed: true,
      message: message,
    }));
  };

  // 작업 실패
  const failed = (message: string) => {
    setState((prev) => ({
      ...prev,
      show: true,
      isSuccessed: false,
      message: message,
    }));
  };

  // 알림창을 닫는 함수
  const close = () => {
    setState((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const noticeCtx: State = {
    show: state.show,
    isSuccessed: state.isSuccessed,
    message: state.message,
    successed,
    failed,
    close,
  };

  return (
    <alertContext.Provider value={noticeCtx}>{children}</alertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(alertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
