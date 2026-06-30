const { ApiError } = require('../../utils/api-error');
const { signToken } = require('../../utils/jwt');
const { UserRepository } = require('../users/user.repository');

const userRepository = new UserRepository();

function sanitizeUser(user) {
  const json = user.toJSON();
  delete json.password;
  return json;
}

class AuthService {
  async register(payload) {
    const user = await userRepository.create(payload);
    const token = signToken({ sub: user.id, role: user.role });
    return { user: sanitizeUser(user), token };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = signToken({ sub: user.id, role: user.role });
    return { user: sanitizeUser(user), token };
  }
}

module.exports = { AuthService };
