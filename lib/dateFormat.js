// const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// export function dateFormat2(date){
//   const d = new Date(date);
//   return `${d.getDate()}-${monthNames[d.getMonth()]}-${d.getFullYear()}`;
// }

export function dateFormat(date){
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-GB', dateOptions);
}

