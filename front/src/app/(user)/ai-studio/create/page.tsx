import PageTitle from "@/components/common/page-title/PageTitle";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import ModelCreate from "@/components/ai-studio/model-create/ModelCreate";
import BackButton from "@/components/ai-studio/back-button/BackButton";

function Create() {
  return (
    <>
      <PageTitle pageTitleContent="모델 만들기" />
      <BackButton />
      <Subtitle content="모델이 될 반려동물의 사진을 여러 장 넣어주세요." />
      <ModelCreate />
    </>
  );
}

export default Create;
