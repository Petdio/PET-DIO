export interface ImgInfoProps {
  albumId: number;
  albumURL: string;
  albumCreated: string;
}

export interface AlbumDataProps {
  conceptName: string;
  conceptId: number;
  path: string;
  detail: ImgInfoProps[];
}
