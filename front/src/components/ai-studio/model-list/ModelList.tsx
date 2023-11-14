"use client";

import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import DeleteIcon from "@mui/icons-material/Delete";
import ModelCreateButton from "../model-create/model-create-button/ModelCreateButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { theme } from "@/styles/ThemeRegistry";
import ThemeList from "../theme-list/ThemeList";

const dummyModelList = [
  {
    modelId: 0,
    modelName: "멍멍이",
  },
  {
    modelId: 1,
    modelName: "망망이",
  },
  {
    modelId: 2,
    modelName: "멍뭉이",
  },
  {
    modelId: 3,
    modelName: "멈뭄미",
  },
  {
    modelId: 4,
    modelName: "멈멈미",
  },
];

function ModelList() {
  const [modelSelected, setModelSelected] = useState(false);
  const [modelID, setModelID] = useState(-1);

  const goToNext = (modelID: number) => {
    setModelSelected(true);
    setModelID(modelID);
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
      {!modelSelected ? (
        <>
          <Subtitle content="어떤 모델을 사진관에 데려갈까요?" />
          <Grid
            container
            sx={{ margin: "0 1rem" }}
            spacing={1}
          >
            {dummyModelList.map((model) => {
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

          <ModelCreateButton />
        </>
      ) : (
        <>
          <Subtitle content="뒤로가기 어떡하냐 / 임시 api호출" />
          <ThemeList />
        </>
      )}
    </>
  );
}

export default ModelList;
