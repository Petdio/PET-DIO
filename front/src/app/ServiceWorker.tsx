"use client";
import { useEffect } from "react";
import { useAlert } from "@/components/provider/AlertProvider";

export default function ServiceWorker() {
  const { failed } = useAlert();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registInit = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");

          registration.waiting?.postMessage("SKIP_WAITING");
        } catch (error) {
          // 등록 실패
          failed("Error : 서비스 워커 등록에 실패했습니다.");
          console.error("service worker 등록 실패:", error);
        }
      };

      registInit();
    }
  }, []);
  return <></>;
}
