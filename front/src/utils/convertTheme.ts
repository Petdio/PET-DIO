export default function convertTheme(themeEN: string) {
  let themekO = '?';
  switch (themeEN) {
    case 'Sticker':
      themekO = '스티커';
      break;
    case 'Halloween':
      themekO = '할로윈';
      break;
    case 'Ninja':
      themekO = '닌자';
      break;
    case 'Mini':
      themekO = '미니';
      break;
  }
  return themekO;
}
