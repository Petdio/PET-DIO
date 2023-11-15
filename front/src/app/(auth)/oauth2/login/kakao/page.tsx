"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAlert } from "@/components/provider/AlertProvider";

export default function KakaoLogInPage() {
  const { failed } = useAlert();

  async function loginReq(code: string) {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `oauth2/login/kakao`,
        { code }
      );

      console.log(response);
      localStorage.setItem("access-token", response.data.accessToken);
      localStorage.setItem("new-member", response.data.newMember);
      window.location.href = "/studio";
    } catch (error) {
      failed(`Error : ${error}`);
      console.error("에러 발생:", error);
    }
  }

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    if (code) {
      console.log(`code: ${code}`);
      loginReq(code);
    }
  }, []);

  return <></>;
}
