function format(v) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return `${v}`.replace(reg, "$&,");
}
function wrapperMoney(o, k) {
  return o && o[k] ? `¥ ${format(o[k])}` : "¥ 0.00";
}
export { format, wrapperMoney };
