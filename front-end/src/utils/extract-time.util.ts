export function extractTimeUtil(date: string) {
  const dateStr = new Date(date);
  const hour = padZero(dateStr.getHours());
  const min = padZero(dateStr.getMinutes());
  return `${hour}:${min}`;
}

function padZero(hour: number) {
  return hour.toString().padStart(2, "0");
}
