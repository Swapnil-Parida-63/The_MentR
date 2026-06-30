const { BaseRepository } = require('../../repositories/base.repository');
const { User } = require('./user.model');

class UserRepository extends BaseRepository {
  constructor() {
    super(User, ['name', 'email', 'phone', 'role']);
  }

  findByEmailWithPassword(email) {
    return User.findOne({ email: email.toLowerCase() }).select('+password');
  }
}

module.exports = { UserRepository };
