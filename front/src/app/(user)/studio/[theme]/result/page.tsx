"use client";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SaveAlt from "@mui/icons-material/SaveAlt";
import NextImage from "next/image";
import PageTitle from "@/components/common/page-title/PageTitle";
import { downloadImage } from "@/utils/downLoadImage";
import ReplayIcon from "@mui/icons-material/Replay";
import ShareIcon from "@mui/icons-material/Share";

export default function Result() {
  const [image, setImage] = useState("");
  const [imageWidth, setImageWidth] = useState(1);
  const [imageHeight, setImageHeight] = useState(1);

  useEffect(() => {
    setImage(
      // "https://static.displate.com/857x1200/displate/2022-12-02/4748a00758338e689e892b1cba74d7e6_743167aa7ffdc3d970bf35c4817743ee.jpg"
      "https://static.displate.com/1200x857/displate/2022-01-27/e556ce3239a00fd80a0029f7cb1e6703_e59e6fbd405c7d32ae29d2abd7d5f035.jpg"
    );
  }, []);

  useEffect(() => {
    console.log(image);
    const img = new Image();
    img.src = image;
    img.onload = () => {
      console.log(img.width, img.height);
      setImageWidth(img.width);
      setImageHeight(img.height);
    };
  }, [image]);

  return (
    <>
      <PageTitle
        pageTitleContent="사진관"
        subtitleContent="이미지를 저장해요."
      />
      <div
        style={{
          padding: "1rem",
          paddingRight: imageHeight > imageWidth ? "4rem" : "1rem",
          paddingLeft: imageHeight > imageWidth ? "4rem" : "1rem",
        }}
      >
        <Box
          width="100%"
          position="relative"
          borderRadius="0.5rem"
          sx={{
            aspectRatio: imageWidth / imageHeight,
            borderRadius: "0.5rem",
          }}
        >
          {image !== "" && (
            <NextImage
              src={image}
              alt="생성된 이미지"
              fill
              placeholder="empty"
              style={{
                borderRadius: "0.5rem",
                cursor: "default",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
        </Box>
      </div>
      <Box padding="1rem" paddingBottom="0">
        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveAlt />}
          fullWidth
          onClick={() => downloadImage(image, "생성 이미지")}
        >
          내 기기에 저장
        </Button>
      </Box>
      <Box
        width="100%"
        padding="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box style={{ flex: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<ReplayIcon />}
            sx={{ width: "100%" }}
          >
            다시 생성
          </Button>
        </Box>
        <Box style={{ width: "0.5rem" }}></Box>
        <Box style={{ flex: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ShareIcon />}
            sx={{ width: "100%" }}
          >
            공유
          </Button>
        </Box>
      </Box>
    </>
  );
}
