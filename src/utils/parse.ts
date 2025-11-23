export function parseNumberFromString(value: string): number {
  const cleaned = value.replace(/[^0-9]/g, '');
  return cleaned === '' ? 0 : parseInt(cleaned, 10);
}

export function formatNumberToString(value: number): string {
  return value === 0 ? '' : value.toString();
}
