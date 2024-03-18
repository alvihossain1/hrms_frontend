// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// export function dateFormat2(date){
//   const d = new Date(date);
//   return `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`;
// }

export function dateFormat(date) {
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-GB', dateOptions);
}


// export function defaultDateNow() {
//   const today = new Date();
//   const numberOfDaysToAdd = 0;
//   const date = today.setDate(today.getDate() + numberOfDaysToAdd);
//   const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
//   return defaultValue;
// }


export function defaultDateNow() {
  const date = new Date;
  return `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`;
}
function addZero(num){
  if(num < 10){
    return "0"+num;
  }
  return num;
}