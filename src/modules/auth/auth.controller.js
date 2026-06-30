const { asyncHandler } = require('../../utils/async-handler');
const { AuthService } = require('./auth.service');

const authService = new AuthService();

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json({ success: true, data: result });
});

const me = asyncHandler(async (req, res) => {
  const user = req.user.toJSON();
  delete user.password;
  res.status(200).json({ success: true, data: user });
});

module.exports = { login, me, register };
