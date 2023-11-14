import ModelList from "@/components/ai-studio/model-list/ModelList";
import PageTitle from "@/components/common/page-title/PageTitle";
import Subtitle from "@/components/studio/subtitle/Subtitle";

function AiStudio() {
  return (
    <>
      <PageTitle pageTitleContent="스튜디오" />
      <Subtitle content="어떤 모델을 사진관에 데려갈까요?" />
      <ModelList />
    </>
  );
}

export default AiStudio;
