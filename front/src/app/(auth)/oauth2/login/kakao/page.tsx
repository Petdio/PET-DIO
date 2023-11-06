"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFcmToken } from "@/app/FCM";

export default function KakaoLogInPage() {
  const { fcmToken } = useFcmToken();

  async function loginReq(code: string) {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `oauth2/login/kakao`,
        { code, fcmToken }
      );

      console.log(response);
      localStorage.setItem("access-token", response.data.accessToken);
      localStorage.setItem("fcmToken", fcmToken);
      window.location.href = "/studio";
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    if (code) {
      console.log(`code: ${code}`);
      console.log(`fcmToken: ${fcmToken}`);
      loginReq(code);
    }
  }, [fcmToken]);

  return <></>;
}
