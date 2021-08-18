const rateLimit = require('../struct/ratelimiter');
const config = require('../config.json');

module.exports = async (req, res) => {
  if (config.ratelimit.enabled) {
    try {
      await rateLimit(config.ratelimit.limits.hello, req.headers['x-real-ip']);
    } catch (error) {
      return res.status(429).send({ 
        message: 'Too many requests' 
      });
    }
  }

  return res.status(200).send(config.helloworld);
};
