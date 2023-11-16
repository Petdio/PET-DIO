"use client";

import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import LoadingButton from "@mui/lab/LoadingButton";
import convertAnimal from "@/utils/convertAnimal";
import { Box } from "@mui/material";

import UploadCreateButton from "./upload-create-button-set/UploadCreateButtonSet";
import ModelCreateNameModal from "./model-create-name-modal/ModelCreateNameModal";

interface ModelFormData {
  files: File[];
  datasetName: string;
  breed: string;
}

function ModelCreate() {
  const router = useRouter();
  const [modelName, setModelName] = useState(""); // 모델 이름
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]); // 화면에 표시할 이미지들
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 업로드
  const [animalIdx, setAnimalIdx] = useState(-1); // 동물 타입
  const animalItems = ["개", "고양이"];
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [modelData, setModelData] = useState<ModelFormData>({
    files: [],
    datasetName: "",
    breed: "",
  });

  const setName = (inputName: string) => {
    setModelName(inputName);
  };

  const [nameModalOpen, setNameModalOpen] = useState(false);
  const handleModalOpen = () => {
    setNameModalOpen(true);
  };

  const handleModalClose = () => {
    setNameModalOpen(false);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      const newImages: (string | ArrayBuffer | null)[] = [];

      // 각 이미지 파일들 처리
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            if (img.width && img.height) {
              newImages.push(reader.result);

              const mimeType = file.type;

              if (mimeType !== "image/jpg") {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                  canvas.toBlob(
                    (blob) => {
                      if (blob) {
                        const newFile = new File(
                          [blob],
                          `image_${index + 1}.jpg`,
                          {
                            type: "image/jpg",
                          }
                        );
                        const animalType = convertAnimal(
                          animalItems[animalIdx]
                        );
                        setModelData({
                          files: [...modelData.files, newFile],
                          datasetName: modelName,
                          breed: animalType,
                        });
                        console.log(modelData);
                      }
                    },
                    "image/jpg",
                    1.0
                  );
                }
              }
              if (index === files.length - 1) {
                // Set isUploadDone to true
                setIsUploadDone(true);
              }
            }
          };
        };
      });

      setImages(newImages);
    }
  };

  const sendModelSetting = async () => {
    setIsDone(true);
    try {
      const response = await axios.post(
        // process.env.NEXT_PUBLIC_API_URL + `ai/create`,
        `/model/train`,
        modelData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("이미지 업로드 성공", response);
      localStorage.setItem("sse-token", response.data);
      router.push("requested");
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  return (
    <>
      <Grid container sx={{ margin: "0 1rem" }} spacing={1}>
        {images.map((image, index) => (
          <Grid key={index} xs={4}>
            <Box
              position={"relative"}
              width={"100%"}
              sx={{ aspectRatio: 1 / 1 }}
            >
              <NextImage
                src={image as string}
                alt="업로드 이미지"
                fill
                placeholder="empty"
                style={{
                  borderRadius: "0.5rem",
                  cursor: "default",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <UploadCreateButton
        isUploadDone={isUploadDone}
        uploadClick={handleFileUploadClick}
        openNameModal={handleModalOpen}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </UploadCreateButton>
      <ModelCreateNameModal
        open={nameModalOpen}
        handleClose={handleModalClose}
        setName={setName}
        animalItems={animalItems}
        sendModelSetting={sendModelSetting}
      />
    </>
  );
}

export default ModelCreate;
