export const getDateNowPlusHours = (hours: number) => {
  const date = new Date();

  date.setHours(date.getHours() + hours);

  return date;
};
