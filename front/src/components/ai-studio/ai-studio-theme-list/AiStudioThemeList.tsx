"use client";
import { useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Image from "next/image";
import ThemeCard from "@/components/studio/theme-card/ThemeCard";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import convertTheme from "@/utils/convertTheme";
import { SlideMUI } from "@/components/animation/SlideMUI";
import { price } from "@/constants/price";
import PriceChip from "@/components/common/price-chip/PriceChip";
import { useAIFormData } from "@/components/provider/AIFormdataProvider";
import LoadingButton from "@mui/lab/LoadingButton";

interface Theme {
  imgURL: string;
  examples: string[];
  name: string;
  path: string;
  id: number;
}

export default function AiStudioThemeList() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, setConceptId } = useAIFormData();

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current!.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      scrollRef.current!.scrollLeft = startX - e.pageX;
    }
  };

  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [exampleList, setExampleList] = useState<string[]>([]);
  const [themeList, setThemeList] = useState<Theme[]>([]);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setModalTitle(convertTheme(themeList[index].name));
    setExampleList(themeList[index].examples);
    setConceptId(themeList[index].id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getThemeList() {
    try {
      const response = await axios.get(
        // process.env.NEXT_PUBLIC_API_URL + `concept/list`,
        `/concept/realphoto/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      console.log(response);
      setThemeList(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  const sendAIForm = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        // process.env.NEXT_PUBLIC_API_URL + `ai/create`,
        `/ai/create/realPhoto`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("모델 및 테마 전송 성공", response);
      localStorage.setItem("sse-token", response.data);
      router.push("generating");
    } catch (error) {
      console.error("모델 및 테마 전송 실패", error);
    }
  };

  useEffect(() => {
    getThemeList();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Grid container spacing={2}>
          {themeList.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={6}
                onClick={() => handleClickOpen(index)}
              >
                <ThemeCard
                  imgSrc={item.imgURL}
                  themeName={convertTheme(item.name)}
                ></ThemeCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={SlideMUI}
        keepMounted
        onClose={handleClose}
        aria-describedby="select-theme"
        maxWidth="xs"
      >
        <DialogTitle textAlign="center" fontWeight="bold">
          {modalTitle}
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Subtitle
            content="이런 이미지를 만들 수 있어요."
            mode="small"
          ></Subtitle>
          <Container
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            sx={{
              backgroundColor: "#454545",
              height: "230px",
              width: "100%",
              overflow: "hidden",
              overflowX: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "100%",
              }}
            >
              {exampleList.map((item, index) => {
                return (
                  <Box
                    sx={{
                      position: "relative",
                      marginBottom: "0.25rem",
                      flexShrink: 0,
                      aspectRatio: 1 / 1,
                      margin: 1,
                    }}
                    key={index}
                  >
                    <Image
                      src={item}
                      alt={`${modalTitle} example ${index}`}
                      fill
                      objectFit="cover"
                      objectPosition="center center"
                      placeholder="empty"
                      style={{ borderRadius: "0.5rem" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Container>
          <DialogContentText
            color="text"
            textAlign="center"
            id="select-theme"
            margin="2rem"
          >
            이 테마로 진행할까요?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem 1rem 3.5rem 1rem",
          }}
        >
          <Button
            sx={{ width: "50%" }}
            variant="contained"
            color="inherit"
            onClick={handleClose}
          >
            취소
          </Button>
          <Box
            width={"50%"}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
          >
            <PriceChip price={price.generateImage} outside />
            <LoadingButton
              sx={{ width: "100%" }}
              loading={isLoading ? true : false}
              variant="contained"
              onClick={sendAIForm}
            >
              확인
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
