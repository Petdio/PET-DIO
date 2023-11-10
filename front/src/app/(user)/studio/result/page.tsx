"use client";
import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SaveAlt from "@mui/icons-material/SaveAlt";
import NextImage from "next/image";
import PageTitle from "@/components/common/page-title/PageTitle";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/navigation";
import downloadImage from "@/utils/downLoadImage";
import shareImage from "@/utils/shareImage";

export default function Result() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [imageWidth, setImageWidth] = useState(1);
  const [imageHeight, setImageHeight] = useState(1);

  useEffect(() => {
    const url = new URL(window.location.href);
    setImage(
      `${process.env.NEXT_PUBLIC_S3_URL}${url.searchParams.get("img")}.jpg`
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
      <Box
        width="100%"
        padding="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box style={{ flex: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ShareIcon />}
            fullWidth
            onClick={() => shareImage(image)}
          >
            공유
          </Button>
        </Box>
        <Box style={{ width: "0.5rem" }}></Box>
        <Box style={{ flex: 1 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveAlt />}
            size="large"
            fullWidth
            onClick={() => downloadImage(image, "petdio-image")}
          >
            저장
          </Button>
        </Box>
      </Box>
    </>
  );
}
