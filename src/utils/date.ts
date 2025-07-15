export function monthDays(month: number): number {
  const currentYear = new Date().getFullYear();
  const daysOfMonth = new Date(currentYear, month, 0).getDate();
  return daysOfMonth;
}
