"use client";
import { useEffect } from "react";
import axios from "axios";
import { TrySharp } from "@mui/icons-material";

export default function KakaoLogInPage() {
  async function loginReq(code: any) {
    try {
      const response = await axios.post(
        `http://k9a206.p.ssafy.io:8080/oauth2/login/kakao`,
        { code }
      );

      console.log(response);
      localStorage.setItem("access-token", response.data.accessToken);
      window.location.href = "/studio";
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    console.log("code", code);
    if (code) {
      loginReq(code);
    }
  }, []);

  return <></>;
}
