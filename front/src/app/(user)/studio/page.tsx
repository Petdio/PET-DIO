"use client";
import ThemeList from "@/components/studio/theme-list/ThemeList";
import PageTitle from "@/components/common/page-title/PageTitle";
import { useEffect } from "react";

export default function Studio() {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <>
      <PageTitle pageTitleContent="사진관" subtitleContent="테마를 선택해요." />
      <ThemeList />
    </>
  );
}
