import PageTitle from "@/components/common/page-title/PageTitle";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import ModelCreate from "@/components/ai-studio/model-create/ModelCreate";

export default function ModelCreatePage() {
  return (
    <>
      <PageTitle
        pageTitleContent="모델 만들기"
        subtitleContent="모델이 될 반려동물의 사진을 여러 장 넣어주세요."
      />
      <ModelCreate />
    </>
  );
}
