"use client";

import { useEffect, useState } from "react";

function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access-token");

    setAccessToken(storedAccessToken);
  }, []);

  return accessToken;
}

export default useAccessToken;
