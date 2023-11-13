"use client";
import { forwardRef, useState, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Image from "next/image";
import { TransitionProps } from "@mui/material/transitions";
import ThemeCard from "../theme-card/ThemeCard";
import Subtitle from "../subtitle/Subtitle";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import convertTheme from "@/utils/convertTheme";
import { useFormData } from "@/app/FormDataProvider";
import { useFcmToken } from "@/app/FCM";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ThemeList {
  imgURL: string;
  examples: string[];
  name: string;
  path: string;
  id: number;
}

export default function ThemeList() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { fcmToken } = useFcmToken();

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const { formData, setFormData } = useFormData();

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
  const [path, setPath] = useState("");
  const [conceptId, setconceptId] = useState(0);
  const [themeList, setThemeList] = useState<ThemeList[]>([]);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setModalTitle(convertTheme(themeList[index].name));
    setExampleList(themeList[index].examples);
    setPath(themeList[index].path);
    setconceptId(themeList[index].id);
  };

  const handleThemeSelect = () => {
    setFormData({ ...formData, conceptId: conceptId });
    router.push(`studio/${path}/add-photo`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getThemeList() {
    try {
      const response = await axios.get(
        // process.env.NEXT_PUBLIC_API_URL + `concept/list`,
        `concept/list`,
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

  const sendFcmToken = async () => {
    try {
      const response = await axios.post(
        // process.env.NEXT_PUBLIC_API_URL + `user/fcm`,
        "/user/fcm",
        { fcmToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      console.log("fcm 토큰 전송 성공", response);
    } catch (error) {
      console.error("fcm 토큰 전송 실패", error);
    }
  };

  useEffect(() => {
    getThemeList();
    router.replace(location.href);
  }, []);

  useEffect(() => {
    sendFcmToken();
    console.log("fcmToken:", fcmToken);
    getThemeList();
  }, [fcmToken]);

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
        TransitionComponent={Transition}
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
          <Button
            sx={{ width: "50%" }}
            variant="contained"
            onClick={handleThemeSelect}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
