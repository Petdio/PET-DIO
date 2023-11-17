"use client";

import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import convertAnimal from "@/utils/convertAnimal";
import { Box } from "@mui/material";
import UploadCreateButton from "./upload-create-button-set/UploadCreateButtonSet";
import ModelCreateNameModal from "./model-create-name-modal/ModelCreateNameModal";
import { useAlert } from "@/components/provider/AlertProvider";

interface ModelFormData {
  files: File[];
  datasetName: string;
  breed: string;
}

function ModelCreate() {
  const router = useRouter();
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]); // 화면에 표시할 이미지들
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 업로드
  const animalItems = ["개", "고양이"];
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [modelData, setModelData] = useState<ModelFormData>({
    files: [],
    datasetName: "",
    breed: "",
  });
  const { failed } = useAlert();

  const setName = (inputName: string) => {
    setModelData((prev) => ({
      ...prev,
      datasetName: inputName,
    }));
  };

  const setBreed = (inputNumber: number) => {
    const animalType = convertAnimal(animalItems[inputNumber]);
    setModelData((prev) => ({
      ...prev,
      breed: animalType,
    }));
  };

  const [nameModalOpen, setNameModalOpen] = useState(false);
  const handleModalOpen = () => {
    setNameModalOpen(true);
    console.log(modelData);
  };

  const handleModalClose = () => {
    setNameModalOpen(false);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIsUploading(true);
      const files = event.target.files;
      const newImages: (string | ArrayBuffer | null)[] = [];
      const updatedFiles: File[] = [];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        await new Promise((resolve) => {
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
                          updatedFiles.push(newFile);
                        }
                        resolve(null);
                      },
                      "image/jpg",
                      1.0
                    );
                  }
                }

                if (index === files.length - 1) {
                  setIsUploading(false);
                  setIsUploadDone(true);
                }
              }
            };
          };
        });
      }

      setImages(newImages);
      setModelData((prev) => ({
        ...prev,
        files: [...updatedFiles],
      }));
    }
  };

  const sendModelSetting = async () => {
    setIsDone(true);
    const formData = new FormData();
    modelData.files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append(`datasetName`, modelData.datasetName);
    formData.append(`breed`, modelData.breed);

    try {
      const response = await axios.post(
        // process.env.NEXT_PUBLIC_API_URL + `ai/create`,
        `/model/train`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("모델 학습용 데이터 업로드 성공", response);
      router.push("/ai-studio/model-create/generating");
    } catch (error) {
      console.error("모델 학습용 데이터 업로드 실패", error);
      failed("Error : 모델 학습용 데이터 업로드 실패!");
    }
  };

  return (
    <>
      <Grid
        container
        sx={{ margin: "0 1rem" }}
        spacing={1}
      >
        {images.map((image, index) => (
          <Grid
            key={index}
            xs={4}
          >
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
      <Box height={"5rem"} />
      <UploadCreateButton
        isUploading={isUploading}
        isUploadDone={isUploadDone}
        isDone={isDone}
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
        setBreed={setBreed}
        animalItems={animalItems}
        sendModelSetting={sendModelSetting}
      />
    </>
  );
}

export default ModelCreate;
