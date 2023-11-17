import PageTitle from "@/components/common/page-title/PageTitle";
import AiStudioThemeList from "@/components/ai-studio/ai-studio-theme-list/AiStudioThemeList";

export default function ImageCreatePage() {
  return (
    <>
      <PageTitle
        pageTitleContent="테마 선택하기"
        subtitleContent="모델에 적용할 테마를 선택해주세요."
      />
      <AiStudioThemeList />
    </>
  );
}
