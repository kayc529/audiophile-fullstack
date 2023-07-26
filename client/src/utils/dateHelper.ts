const moment = require('moment');
export const convertToSystemTime = (
  date: Date | string | undefined
): string => {
  return moment(date).format('MMM DD, YYYY');
};
