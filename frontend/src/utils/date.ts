export function formatWeekday(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  }).format(date);
}
