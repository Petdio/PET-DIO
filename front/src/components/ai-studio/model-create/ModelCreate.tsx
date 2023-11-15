"use client";

import { forwardRef, useState, useRef, ChangeEvent, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useFormData } from "@/app/FormDataProvider";
import { useMultiFormData } from "@/app/MultiFormdataProvider";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import LoadingButton from "@mui/lab/LoadingButton";

// import Image from "next/image";

import { Box, Button } from "@mui/material";

import UploadCreateButton from "./upload-create-button-set/UploadCreateButtonSet";
import ModelCreateNameModal from "./model-create-name-modal/ModelCreateNameModal";

function ModelCreate() {
  const [modelName, setModelName] = useState("");
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
  const [imageWidths, setImageWidths] = useState<number[]>([]);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { multiFormData, setMultiFormData } = useMultiFormData();

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
      const newWidths: number[] = [];
      const newHeights: number[] = [];

      // Process each file
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            if (img.width && img.height) {
              newImages.push(reader.result);
              newWidths.push(img.width);
              newHeights.push(img.height);

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
                        setMultiFormData({
                          ...multiFormData,
                          imageFiles: [
                            ...(multiFormData.imageFiles || []),
                            newFile,
                          ],
                        });
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
      setImageWidths(newWidths);
      setImageHeights(newHeights);
    }
  };

  const [isUploadDone, setIsUploadDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      />
    </>
  );
}

export default ModelCreate;
