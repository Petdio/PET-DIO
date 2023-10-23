"use client";
import { forwardRef, useState } from "react";
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
import { Container, height } from "@mui/system";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ThemeList() {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [exampleList, setExampleList] = useState<string[]>([]);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setModalTitle(themeList[index].name);
    setExampleList(themeList[index].examples);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 추후 이 리스트를 api로 가져와야함
  const themeList = [
    {
      src: "https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg",
      examples: [
        "https://static.displate.com/857x1200/displate/2023-04-06/92cc37dd392bf0c242aa6b7f8dce98b8_db6fcf774335f5c441aeb0cc2a42f0eb.jpg",
        "https://static.displate.com/857x1200/displate/2023-01-30/28ab887200316bc5dcccee826afd21ed_662dd4bd513811650151cd75245e3dae.jpg",
        "https://static.displate.com/857x1200/displate/2023-03-23/0b87bf910d68ea8f63f1291666f0bd7e_86605742b59ddace60ad2479061e1240.jpg",
      ],
      name: "우주복",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-09-26/c60a6f815876fa8923b827464123e82e_748289fcbf9a9a65967b5712a5ad9ad2.jpg",
      examples: [""],
      name: "크리스마스",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2022-12-21/2bac69382cc5d3a3c8c0573677efae1c_c2f24f483cd8fe150251f72f223013f7.jpg",
      examples: [""],
      name: "히어로",
    },
    {
      src: "https://t3.ftcdn.net/jpg/05/85/80/82/360_F_585808277_QID4Suse88rzCqjCJ97XfeCMMlZtWLt2.jpg",
      examples: [""],
      name: "웨딩",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-03-11/87dd489d90598737082eaf8dd8ca950a_b640ff9c43ad1908ee9bf747e67fd18e.jpg",
      examples: [""],
      name: "신사",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-06-24/23c19fd559c4f62e02cd2bd2f1c5115b_03728cfefdb9cbfc8ea9153e4e188a5b.jpg",
      examples: [""],
      name: "사람과 함께",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-09-09/f0293de4182f3a53fc495e8d9428b75c_3959566d152574ee3e5a2f562c30bbcc.jpg",
      examples: [""],
      name: "귀족",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-01-23/f862301ec9040fc3df2ed55ff0a74274_fb615fe12831ae4ac7f7a3d32cee8e6a.jpg",
      examples: [""],
      name: "먹방",
    },
  ];
  return (
    <>
      <Box
        sx={{
          padding: "20px",
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
                <ThemeCard imgSrc={item.src} themeName={item.name}></ThemeCard>
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
      >
        <DialogTitle textAlign="center">{modalTitle}</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <Subtitle
            content="이런 이미지를 만들 수 있어요."
            mode="modal"
          ></Subtitle>
          <Container
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
              margin: "20px 0 20px 0",
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
          <DialogContentText color="text" textAlign="center" id="select-theme">
            이 테마로 진행할까요?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 17px 56px 17px",
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
            onClick={handleClose}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
