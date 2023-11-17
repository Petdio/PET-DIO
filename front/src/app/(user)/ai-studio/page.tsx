import ModelList from "@/components/ai-studio/model-list/ModelList";
import PageTitle from "@/components/common/page-title/PageTitle";
import { Typography, Box } from "@mui/material";

function AiStudio() {
  return (
    <>
      <PageTitle
        pageTitleContent="AI 스튜디오"
        subtitleContent="어떤 AI 모델을 적용할까요?"
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        margin={"0 1rem 1rem 1rem"}
      >
        <Typography variant="caption">
          모델은 현재 계정당 1개씩만 생성할 수 있어요.
        </Typography>
        <Typography variant="caption">업데이트를 기다려주세요!</Typography>
      </Box>
      <ModelList />
    </>
  );
}

export default AiStudio;
