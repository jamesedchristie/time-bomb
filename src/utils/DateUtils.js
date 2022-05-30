const DELIMETERS = ['/', '-'];

/**
 * 
 * @param {String} string Datestring in format e.g. dd/mm/yyyy or dd-mm-yyyy
 * @returns {Date|undefined}
 */
export function parseDatestring(string) {
  if (!string || typeof string !== 'string') return undefined;
  for (let char of DELIMETERS) {
    const split = string.split(char);
    if (split.length === 3) {
      const [day, month, year] = split.map(i => Number(i));
      const date = new Date(year, month - 1, day);
      if (isValidDate(date)) return date;
    }
  }
  return undefined;
}

/**
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {Number} Full days between date1 and date2
 */
export function getFullDaysBetweenDates(date1, date2) {
  if (!isValidDate(date1) || !isValidDate(date2)) return undefined;
  let startDate = new Date(date1), endDate = new Date(date2);
  if (startDate.getTime() === endDate.getTime()) return 0;
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  startDate.setDate(startDate.getDate() + 1);
  const ms = endDate - startDate;
  const days = ms / 1000 / 60 / 60 / 24;
  return Math.abs(Math.round(days));
}

export function formatDate(date) {
  if (!date || !(date instanceof Date) || !isValidDate(date)) return '';
  return date.toLocaleDateString();
}

function isValidDate(date) {
  return !isNaN(Date.parse(date));
}