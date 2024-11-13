export default function convertToUsd(cost: number) {
  return (cost / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
