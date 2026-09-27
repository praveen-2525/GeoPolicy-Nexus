// Simple memory-based rate limiter middleware for GeoPolicy Nexus API
const rateLimitMap = new Map();

/**
 * Rate Limiter Middleware
 * Default limit: 30 requests per minute per IP address
 */
const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute
  const maxRequests = options.max || 30; // 30 requests per windowMs

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const clientRate = rateLimitMap.get(ip);

    if (now > clientRate.resetTime) {
      clientRate.count = 1;
      clientRate.resetTime = now + windowMs;
      return next();
    }

    clientRate.count += 1;

    if (clientRate.count > maxRequests) {
      const retryAfterSeconds = Math.ceil((clientRate.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Please wait ${retryAfterSeconds} seconds before sending more requests.`,
        retryAfter: retryAfterSeconds
      });
    }

    next();
  };
};

module.exports = rateLimiter;
