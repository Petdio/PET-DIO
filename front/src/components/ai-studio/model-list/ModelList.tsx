"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import DeleteIcon from "@mui/icons-material/Delete";
import ModelCreateButton from "../model-create/model-create-button/ModelCreateButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { theme } from "@/styles/ThemeRegistry";
import NoModel from "./no-model/NoModel";
import ThemeList from "../theme-list/ThemeList";

interface ModelProps {
  modelId: number;
  modelName: string;
}

function ModelList() {
  const [modelSelected, setModelSelected] = useState(false);
  const [modelId, setModelID] = useState(-1);

  const [modelList, setModelList] = useState<ModelProps[]>([]);
  async function getModelList() {
    try {
      const response = await axios.get(
        // process.env.NEXT_PUBLIC_API_URL + `concept/list`,
        `/model/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      console.log(response);
      setModelList(response.data as ModelProps[]);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }
  useEffect(() => {
    getModelList();
  }, []);

  const goToNext = (modelId: number) => {
    setModelSelected(true);
    setModelID(modelId);
  };
  const goPrev = () => {
    setModelSelected(false);
  };
  const Item = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
    },
  }));
  return (
    <>
      <Button onClick={() => setModelSelected(true)}>임시다음버튼</Button>
      {!modelSelected ? (
        <>
          <Subtitle content="어떤 모델을 사진관에 데려갈까요?" />
          {modelList.length !== 0 ? (
            <Grid
              container
              sx={{ margin: "0 1rem" }}
              spacing={1}
            >
              {modelList.map((model) => {
                return (
                  <Grid
                    key={model.modelId}
                    xs={6}
                  >
                    <Item
                      sx={{
                        border: "1px solid #18181812",
                        borderLeft: "3px solid #A185FF",
                      }}
                      onClick={() => goToNext(model.modelId)}
                    >
                      {model.modelName}
                      <PlayArrowIcon
                        fontSize="small"
                        htmlColor={theme.palette.grey[400]}
                      />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <NoModel />
          )}

          <ModelCreateButton />
        </>
      ) : (
        <>
          <Subtitle content="뒤로가기 어떡하냐 / 임시 api호출" />
          <ThemeList
            modelId={modelId}
            goPrev={goPrev}
          />
        </>
      )}
    </>
  );
}

export default ModelList;
