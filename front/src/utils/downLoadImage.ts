/**
 * 이미지를 다운로드받는 함수
 * @param imgSrc 다운 받을 이미지의 url
 * @param fileName 어떤 이름으로 다운로드할지
 * @returns void
 */

export default async function downloadImage(imgSrc: string, fileName: string) {
  try {
    const response = await fetch(imgSrc);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    console.log(blob);
    a.href = blobUrl;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    return console.log(err);
  }
}
