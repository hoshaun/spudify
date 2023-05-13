const isAlphanumeric = function(str) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(str);
}

const hasWhitespace = function(str) {
  return str.indexOf(' ') >= 0;
}

module.exports = {
  isAlphanumeric,
  hasWhitespace
};