"use client";
import { Grid, Box } from "@mui/material";
import ThemeCard from "../theme-card/ThemeCard";

export default function ThemeList() {
  // 추후 이 리스트를 api로 가져와야함
  const themeList = [
    {
      src: "https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg",
      name: "우주복",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-09-26/c60a6f815876fa8923b827464123e82e_748289fcbf9a9a65967b5712a5ad9ad2.jpg",
      name: "크리스마스",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2022-12-21/2bac69382cc5d3a3c8c0573677efae1c_c2f24f483cd8fe150251f72f223013f7.jpg",
      name: "히어로",
    },
    {
      src: "https://t3.ftcdn.net/jpg/05/85/80/82/360_F_585808277_QID4Suse88rzCqjCJ97XfeCMMlZtWLt2.jpg",
      name: "웨딩",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-03-11/87dd489d90598737082eaf8dd8ca950a_b640ff9c43ad1908ee9bf747e67fd18e.jpg",
      name: "신사",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-06-24/23c19fd559c4f62e02cd2bd2f1c5115b_03728cfefdb9cbfc8ea9153e4e188a5b.jpg",
      name: "사람과 함께",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-09-09/f0293de4182f3a53fc495e8d9428b75c_3959566d152574ee3e5a2f562c30bbcc.jpg",
      name: "귀족",
    },
    {
      src: "https://static.displate.com/857x1200/displate/2023-01-23/f862301ec9040fc3df2ed55ff0a74274_fb615fe12831ae4ac7f7a3d32cee8e6a.jpg",
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
              <Grid key={index} item xs={6}>
                <ThemeCard imgSrc={item.src} themeName={item.name}></ThemeCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
