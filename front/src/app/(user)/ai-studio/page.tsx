import ModelList from "@/components/ai-studio/model-list/ModelList";
import PageTitle from "@/components/common/page-title/PageTitle";

function AiStudio() {
  return (
    <>
      <PageTitle
        pageTitleContent="AI 스튜디오"
        subtitleContent="어떤 AI 모델을 적용할까요?"
      />
      <ModelList />
    </>
  );
}

export default AiStudio;
