const { formatDate } = require("./date-helper.js");
const { v4 } = require("uuid");

const generateID = (prefix = '') => {
  const timestamp = formatDate(new Date(), "ddMMyyyy");
  const uuid = v4().replace(/-/g, "").substring(0, 5);

  return prefix + timestamp + "-" + uuid;
};

module.exports = { generateID };
