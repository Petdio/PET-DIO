import ThemeList from '@/components/studio/theme-list/ThemeList';
import PageTitle from '@/components/common/page-title/PageTitle';
import WelcomeModal from '@/components/common/welcome-modal/WelcomeModal';

export default function Studio() {
  return (
    <>
      <PageTitle
        pageTitleContent="사진관"
        subtitleContent="테마를 선택해요."
      />
      <ThemeList />
      <WelcomeModal />
    </>
  );
}
