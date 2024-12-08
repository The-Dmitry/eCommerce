export default function getColor(value: number) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const red = Math.round(255 - (clampedValue / 100) * 255);
  const green = Math.round((clampedValue / 100) * 255);
  return `rgb(${red}, ${green}, 0)`;
}
