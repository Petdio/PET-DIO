"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const loadingMessageArr = [
  "옷 입히는 중...",
  "빗질하는 중...",
  "화장하는 중...",
  "예쁘게 꾸미는 중...",
];

export default function Generating() {
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(true);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  if (showComponent) {
    setTimeout(
      () =>
        setLoadingMessageIdx(
          (loadingMessageIdx + 1) % loadingMessageArr.length
        ),
      2000
    );
  }

  useEffect(() => {
    const eventSource = new EventSource(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }ai/sse?generationId=${localStorage.getItem("sse-token")}`
    );

    eventSource.addEventListener("notify", (event) => {
      console.log("Received myEventName event:", event.data);
      if (event.data !== "Connection completed") {
        const imageKey = event.data.match(/\/([^/]+)\.jpg$/);
        setShowComponent(false);
        setTimeout(() => {
          router.push(`/studio/result?img=${imageKey[1]}`);
        }, 4000);
      }
    });

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "70%",
          justifyContent: "space-around",
        }}
      >
        {showComponent ? (
          <>
            <Typography
              variant="body1"
              color="black"
              sx={{ textAlign: "center", mb: "20px" }}
            >
              {loadingMessageArr[loadingMessageIdx]}
            </Typography>
            <LinearProgress />
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              color="black"
              sx={{ textAlign: "center", mb: "20px" }}
            >
              이미지 생성 완료!
            </Typography>
            <CheckIcon color="primary" sx={{ width: "100%" }} />
          </>
        )}
      </Box>
    </Box>
  );
}
