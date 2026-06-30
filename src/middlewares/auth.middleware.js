const { ApiError } = require('../utils/api-error');
const { asyncHandler } = require('../utils/async-handler');
const { verifyToken } = require('../utils/jwt');
const { User } = require('../modules/users/user.model');

const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) throw new ApiError(401, 'Authentication token is required');

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.sub).select('+password');

  if (!user) throw new ApiError(401, 'Invalid authentication token');
  req.user = user;
  next();
});

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to access this resource'));
  }
  return next();
};

module.exports = { authenticate, authorize };
