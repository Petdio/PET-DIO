"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    /** 로그인 안했을 경우 */
    // router.push("/login");
    /** 로그인 했을 경우 */
    router.push("/studio");
  }, []);

  return <></>;
}
