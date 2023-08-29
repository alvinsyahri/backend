const getFormattedDate = (inputDate) => {
  const fullDate = new Date(inputDate);
  const year = fullDate.getFullYear();
  const month = String(fullDate.getMonth() + 1).padStart(2, '0');
  const date = String(fullDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate
};
  
  module.exports = getFormattedDate;