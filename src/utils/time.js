export const timeStamp = () => {
  function zeroAdd(dt) {
    if (dt > 10) {
      return dt.toString();
    } else {
      return "0" + dt.toString();
    }
  }
  const date = new Date();
  let frag = {
    YYYY: date.getFullYear().toString(),
    MM: zeroAdd(date.getMonth() + 1),
    DD: zeroAdd(date.getDate()),
    hh: zeroAdd(date.getHours()),
    mm: zeroAdd(date.getMinutes()),
    ss: zeroAdd(date.getSeconds()),
  };
  return frag.YYYY + frag.MM + frag.DD + frag.hh + frag.mm + frag.ss;
};
