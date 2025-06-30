module.exports = {};
const environments = {
  development: { port: 3000 },
  testing: { port: 4000 },
  production: { port: 80 }
};

const env = process.env.NODE_ENV || 'development';
module.exports = environments[env];
