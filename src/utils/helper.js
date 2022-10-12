export const toShortFormat = function (date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (date === "-") return "-";
  const isoDate = new Date(parseInt(date));
  const day = isoDate.getDate();
  const monthIndex = isoDate.getMonth();
  const monthName = monthNames[monthIndex];

  const year = isoDate.getFullYear();

  return `${day} ${monthName} ${year}`;
};
