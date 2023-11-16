"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import DeleteIcon from "@mui/icons-material/Delete";
import ModelCreateButton from "../model-create/model-create-button/ModelCreateButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { theme } from "@/styles/ThemeRegistry";
import NoModel from "./no-model/NoModel";
import { useAIFormData } from "@/components/provider/AIFormdataProvider";
import { useRouter } from "next/navigation";

interface ModelProps {
  modelId: number;
  modelName: string;
}

function ModelList() {
  const router = useRouter();
  const { setModelId } = useAIFormData();
  const [modelList, setModelList] = useState<ModelProps[]>([]);

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

  const handleSelectModel = (modelId: number) => {
    setModelId(modelId);
    router.push("image-create");
  };

  useEffect(() => {
    getModelList();
  }, []);

  return (
    <>
      {modelList.length !== 0 ? (
        <Grid container sx={{ margin: "0 1rem" }} spacing={1}>
          {modelList.map((model) => {
            return (
              <Grid key={model.modelId} xs={6}>
                <Item
                  sx={{
                    border: "1px solid #18181812",
                    borderLeft: "3px solid #A185FF",
                  }}
                  onClick={() => handleSelectModel(model.modelId)}
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
  );
}

export default ModelList;
