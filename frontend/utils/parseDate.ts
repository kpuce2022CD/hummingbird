export const parseDate = (date: Date, type: string) => {
  const year = date.getFullYear();
  const month = parseInt(date.getMonth().toString()) + 1;
  const day = date.getDate();
  const tmpDay = `${year}-${month}-${day}`;
  return type === 'start' ? `${tmpDay} 00:00:00` : `${tmpDay} 23:59:59`;
};
