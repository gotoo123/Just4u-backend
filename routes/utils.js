const getNowDate = () => {
  const date = new Date();
  console.log(date.getFullYear(), date.getMonth(), date.getDay())
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = (date.getDay()).toString().padStart(2, '0');
  return `${year}-${month}-${day}`
}

module.exports = {getNowDate}