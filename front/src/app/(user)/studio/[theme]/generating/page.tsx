"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { theme } from "@/styles/ThemeRegistry";
import { useFcmToken } from "@/app/FCM";

const loadingMessageArr = [
  "사진과 일치하는 품종을 입력해야 원하는 이미지를 얻을 수 있어요.",
  "생성된 이미지를 저장하거나 다른 사람들과 공유해보세요!",
  "앨범 페이지에서 원하는 테마만 필터링할 수 있어요.",
  "반려동물 사진은 정방향으로, 흔들리지 않게, 얼굴이 잘 나오도록 찍어주세요.",
  "이미지 생성 후 설문조사를 완료하시면 코인을 추가로 받을 수 있어요.",
];

export default function Generating() {
  const { fcmToken } = useFcmToken();
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(true);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  if (showComponent) {
    setTimeout(
      () =>
        setLoadingMessageIdx(
          (loadingMessageIdx + 1) % loadingMessageArr.length
        ),
      6000
    );
  }

  useEffect(() => {
    if (fcmToken !== "") {
      const firebaseApp = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
      });

      const messaging = getMessaging(firebaseApp);

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload.notification?.image);
        const imageKey = payload.notification?.image?.match(/\/([^/]+)\.jpg$/);

        if (imageKey) {
          setShowComponent(false);
          setTimeout(() => {
            router.push(`/studio/result?img=${imageKey[1]}`);
          }, 4000);
        } else {
          console.log("No match found");
        }
      });
    } else {
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
    }
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
              textAlign="center"
              color={theme.palette.primary.light}
              fontSize={14}
            >
              tip.
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.common.black}
              sx={{
                textAlign: "center",
                mt: "0.5rem",
                mb: "20px",
                wordBreak: "keep-all",
              }}
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
