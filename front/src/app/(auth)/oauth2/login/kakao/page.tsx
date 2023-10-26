"use client";
import { useEffect } from "react";
import axios from "axios";

export default function KakaoLogInPage() {
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    console.log("code", code);
    if (code) {
      axios({
        method: "post",
        url: `https://www.petdio.co.kr/api/oauth2/login/kakao`,
        data: { code },
      })
        .then((res) => {
          localStorage.setItem("access-token", res.data.accessToken);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("에러 발생:", error);
        });
    }
  }, []);

  return <></>;
}
