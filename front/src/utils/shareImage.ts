/**
 * 이미지를 다운로드받는 함수
 * @param imgSrc 다운 받을 이미지의 url
 * @param fileName 어떤 이름으로 다운로드할지
 * @returns void
 */

export default async function shareImage(imgSrc: string) {
  if (navigator.share) {
    const imageKey = imgSrc.match(/\/([^/]+)\.jpg$/);
    if (imageKey) {
      navigator.share({
        url: `https://petdio.co.kr/studio/result?img=${imageKey[1]}`,
        title: "Petdio: 우리집 멍냥이를 위한 이색 사진관",
      });
    }
  } else {
    alert("공유하기가 지원되지 않는 환경입니다.");
  }
}
