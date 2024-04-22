const dbConfig = require('./dist/dbConfig/dbConfig');
console.log(dbConfig.default);

module.exports = {
  dev: {
    driver: 'pg',
    ...dbConfig.default,
  },
  test: {
    driver: 'pg',
    ...dbConfig.default,
  },
};
