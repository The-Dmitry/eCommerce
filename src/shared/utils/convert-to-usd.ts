export default function convertToUsd(cost: number | undefined) {
  return cost
    ? (cost / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    : null;
}
