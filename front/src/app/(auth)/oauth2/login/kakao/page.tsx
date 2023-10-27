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
        url: `http://k9a206.p.ssafy.io:8080/oauth2/login/kakao`,
        data: { code },
      })
        .then((res) => {
          console.log(res);
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
