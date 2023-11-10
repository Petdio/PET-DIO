export default function convertTheme(themeEN: string) {
  let themeKO = '?';
  switch (themeEN) {
    case 'Sketch':
      themeKO = '스케치';
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
    case 'SKYintheHeaven':
      themeKO = '천국';
  }
  return themeKO;
}
