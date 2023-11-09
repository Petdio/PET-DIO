"use client";
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registInit = async () => {
        try{
        const registration = await navigator.serviceWorker.register("/sw.js");

        registration.waiting?.postMessage("SKIP_WAITING");

        }
        catch(error){
          // 등록 실패
          console.error('Service Worker 등록 실패:', error);
        }
      };

      registInit();
    }
  }, []);
  return <></>;
}
