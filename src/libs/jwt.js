const jwt = require('jsonwebtoken');

const { TOKEN_SECRET_KEY } = process.env;

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET_KEY, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
};

module.exports = createAccessToken;
