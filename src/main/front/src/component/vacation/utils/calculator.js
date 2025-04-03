const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (isNaN(start) || isNaN(end)) return 0;

  const diffDays = (end - start) / (1000 * 60 * 60 * 24);
  return diffDays + 1;
};
export default calculateDays;
