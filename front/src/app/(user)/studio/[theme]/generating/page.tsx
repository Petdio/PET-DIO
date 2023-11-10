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
    //   const firebaseApp = initializeApp({
    //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    //     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    //     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    //     appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    //     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
    //   });

    //   const messaging = getMessaging(firebaseApp);

    //   onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload.notification?.image);
    //     const imageKey = payload.notification?.image?.match(/\/([^/]+)\.jpg$/);

    //     if (imageKey) {
    //       setShowComponent(false);
    //       setTimeout(() => {
    //         router.push(`/studio/result?img=${imageKey[1]}`);
    //       }, 4000);
    //     } else {
    //       console.log('No match found');
    //     }
    //   });
    const eventSource = new EventSource(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }ai/sse?generationId=${localStorage.getItem("sse-token")}`
    );

    eventSource.addEventListener("notify", (event) => {
      // const data = JSON.parse(event.data);
      console.log("Received myEventName event:", event.data);
    });

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      // 컴포넌트가 언마운트 될 때 EventSource를 닫습니다.
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
