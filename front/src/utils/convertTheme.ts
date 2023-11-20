export default function convertTheme(themeEN: string) {
  let themeKO = "이름없음";
  switch (themeEN) {
    case "Sketch":
      themeKO = "스케치";
      break;
    case "Halloween":
      themeKO = "할로윈";
      break;
    case "Ninja":
      themeKO = "닌자";
      break;
    case "Mini":
      themeKO = "미니";
      break;
    case "SKYintheHeaven":
      themeKO = "하늘";
      break;
    case "SKY":
      themeKO = "하늘";
      break;
    case "Goggles":
      themeKO = "고글";
      break;
    case "Christmas_sticker":
      themeKO = "크리스마스 스티커";
      break;
    case "Christmas_reality":
      themeKO = "크리스마스";
      break;
    case "model_sketch":
      themeKO = "스케치";
      break;
  }
  return themeKO;
}
