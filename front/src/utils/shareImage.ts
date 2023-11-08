/**
 * 이미지를 다운로드받는 함수
 * @param imgSrc 다운 받을 이미지의 url
 * @param fileName 어떤 이름으로 다운로드할지
 * @returns void
 */

export default async function shareImage(imgSrc: string, fileName: string) {
  if (navigator.share) {
    try {
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      // const ext = imgSrc.split(".").pop();
      // const file = new File([blob], "image." + ext, { type: blob.type });
      navigator.share({
        files: [
          new File([blob], `${fileName}.jpg`, {
            type: blob.type,
          }),
        ],
        title: "Petdio: 우리집 멍냥이를 위한 이색 사진관",
      });
    } catch (err) {
      return console.log(err);
    }
  } else {
    alert("공유하기가 지원되지 않는 환경입니다.");
  }
}
