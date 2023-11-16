"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";
import { theme } from "@/styles/ThemeRegistry";
import ErrorBoundary from "@/app/ErrorBoundary";
import { useAlert } from "@/components/provider/AlertProvider";

const loadingMessageArr = [
  "커스텀 모델을 통한 이미지 생성은 10초 밖에 안 걸려요. 조금만 기다려 주세요!",
  "앱을 나가거나 다른 페이지를 보셔도 돼요. 알림이 따로 갈거예요.",
  "생성된 이미지를 저장하거나 다른 사람들과 공유해보세요!",
  "앨범 페이지에서 원하는 테마만 필터링할 수 있어요.",
  "이미지 생성 후 설문조사를 완료하시면 코인을 추가로 받을 수 있어요.",
];

export default function AIImageGenerating() {
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(true);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const { successed, failed } = useAlert();

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
    successed("업로드 성공! 조금만 기다려 주세요.");
    const eventSource = new EventSource(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }ai/sse?generationId=${localStorage.getItem("sse-token")}`
    );

    eventSource.addEventListener("notify", (event) => {
      console.log("Received myEventName event:", event.data);
      if (event.data !== "Connection completed") {
        if (event.data === "fail") {
          failed("Error : 이미지 생성에 실패했어요. 개발진에 문의해주세요.");
          eventSource.close();
          setTimeout(() => {
            router.push(`/ai-studio`);
          }, 3000);
        } else {
          const imageKey = event.data.match(/\/([^/]+)\.jpg$/);
          setShowComponent(false);
          setTimeout(() => {
            router.push(`/ai-studio/result?img=${imageKey[1]}`);
          }, 2000);
        }
      }
    });

    eventSource.onerror = (error) => {
      failed(
        "Error : 서버와의 알림 연결에 실패했어요! 생성된 이미지는 앨범에서 확인해주세요."
      );
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
    // }
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
