interface ImgInfoProps {
  imgSrc: string;
  themeName: string;
  date: string;
}

interface ThemeImgListProps {
  [themeName: string]: ImgInfoProps[];
}

interface Props {
  albumList: ThemeImgListProps[];
}

function AlbumPage({ albumList }: Props) {
  return <>dd</>;
}

export default AlbumPage;
