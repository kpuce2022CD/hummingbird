export const parseDate = (date: Date, type: string) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const tmpDay = `${year}-${month}-${day}`;
  return type === 'start' ? `${tmpDay} 00:00:00` : `${tmpDay} 23:59:59`;
};
