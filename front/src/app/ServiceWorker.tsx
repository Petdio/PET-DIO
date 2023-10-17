"use client";
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register("sw.js");

        registration.waiting?.postMessage("SKIP_WAITING");
      };

      registInit();
    }
  }, []);
  return <></>;
}
