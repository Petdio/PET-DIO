import ThemeList from "@/components/studio/theme-list/ThemeList";
import PageTitle from "@/components/common/page-title/PageTitle";
import FirebaseTest from "@/components/FirebaseTest";

export default function Studio() {
  return (
    <>
      <FirebaseTest />
      <PageTitle pageTitleContent="사진관" subtitleContent="테마를 선택해요." />
      <ThemeList />
    </>
  );
}
