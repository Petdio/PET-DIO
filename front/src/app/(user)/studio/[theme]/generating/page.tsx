"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

export default function Generating() {
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
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
              옷 입히는 중...
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
