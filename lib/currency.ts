export const UGX_RATE = 3700

export function formatDual(ugx: number) {
  return `UGX ${ugx.toLocaleString()} (~ $${(ugx / UGX_RATE).toFixed(2)} USD)`
}
