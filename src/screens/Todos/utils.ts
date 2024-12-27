import moment from 'moment';

export const getDateTimeByTimeStamp = (stamp: string) => {
  const timeStamp = parseInt(stamp);
  const itemDate = moment(timeStamp);
  const todayDate = moment().startOf('day');

  const isToday = itemDate.isSame(todayDate, 'day');
  const formattedDate = isToday
    ? itemDate.format('hh:mm A') // Show time only if today
    : itemDate.format('MMM DD, YYYY, hh:mm A'); // Show full date otherwise

  return formattedDate;
};
