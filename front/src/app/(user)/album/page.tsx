// components
import PageTitle from '@/components/common/page-title/PageTitle';
import AlbumList from '@/components/album/album-list/AlbumList';

function Album() {
  return (
    <>
      <PageTitle pageTitleContent="앨범" />
      <AlbumList />
    </>
  );
}

export default Album;
