import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const HeadMeta = ({ title, description, url, image }: Props) => {
  return (
    <Head>
      <title>{title || 'Petdio'}</title>
      <meta
        name="description"
        content={
          description ||
          '반려동물을 위한 AI 이미지 생성 스튜디오입니다. 반려동물의 이미지를 업로드하고 세부 설정을 완료하면 반려동물이 등장하는 특별한 이미지를 생성해 줍니다.'
        }
      />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <meta
        property="og:title"
        content={title || 'Petdio'}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={url || 'https://petdio.co.kr'}
      />
      <meta
        property="og:image"
        content={image || 'icons/icon-512x512.png'}
      />
      <meta
        property="og:article:author"
        content="A206"
      />
    </Head>
  );
};

export default HeadMeta;
