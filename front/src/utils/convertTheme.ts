export default function convertTheme(themeEN: string) {
  let themeKO = '?';
  switch (themeEN) {
    case 'Sticker':
      themeKO = '스티커';
      break;
    case 'Halloween':
      themeKO = '할로윈';
      break;
    case 'Ninja':
      themeKO = '닌자';
      break;
    case 'Mini':
      themeKO = '미니';
      break;
  }
  return themeKO;
}
