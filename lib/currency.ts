export const UGX_RATE = 3700;
export function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
}
export function formatUSD(amount: number) {
  return `$${(amount / UGX_RATE).toFixed(2)}`;
}
export function formatDual(amount: number) {
  return `${formatUGX(amount)} / ${formatUSD(amount)}`;
}
export function convertUGXToUSD(ugx: number) {
  return ugx / UGX_RATE;
}
