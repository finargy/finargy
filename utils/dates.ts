/**
 * "It returns a new Date object that is the current date plus the number of hours passed in."
 *
 * @param {number} hours - number - the number of hours to add to the current date
 * @returns A date object that is the current date plus the number of hours passed in.
 */
export const getDateNowPlusHours = (hours: number) => {
  const date = new Date();

  date.setHours(date.getHours() + hours);

  return date;
};
