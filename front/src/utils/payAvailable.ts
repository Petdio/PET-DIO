export function payAvailable(userCoin: number, payCoin: number) {
  if (userCoin >= payCoin) return true;
  return false;
}
