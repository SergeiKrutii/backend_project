const goalsDateConfig = (value, helpers) => {
  const dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  const isValidDate = dateRegex.test(value);
  if (!isValidDate) {
    return helpers.message({
      custom: "Invalid 'date'. Please, use YYYY-MM string format",
    });
  }
  return value;
};
const bookDateConfig = (value, helpers) => {
  const dateRegex = /^\d{4}$/;
  const isValidDate = dateRegex.test(value);
  if (!isValidDate) {
    return helpers.message({
      custom: "Invalid 'date'. Please, use YYYY",
    });
  }
  return value;
};

module.exports = { goalsDateConfig, bookDateConfig };
