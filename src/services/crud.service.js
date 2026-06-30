const { ApiError } = require('../utils/api-error');

class CrudService {
  constructor(repository, resourceName, options = {}) {
    this.repository = repository;
    this.resourceName = resourceName;
    this.populate = options.populate || [];
    this.beforeCreate = options.beforeCreate;
    this.beforeUpdate = options.beforeUpdate;
  }

  async create(data) {
    const payload = this.beforeCreate ? await this.beforeCreate(data) : data;
    return this.repository.create(payload);
  }

  async getById(id) {
    const item = await this.repository.findById(id, this.populate);
    if (!item) throw new ApiError(404, `${this.resourceName} not found`);
    return item;
  }

  async list(query) {
    return this.repository.paginate(query, {}, this.populate);
  }

  async update(id, data) {
    const payload = this.beforeUpdate ? await this.beforeUpdate(data) : data;
    const item = await this.repository.updateById(id, payload);
    if (!item) throw new ApiError(404, `${this.resourceName} not found`);
    return item;
  }

  async remove(id) {
    const item = await this.repository.deleteById(id);
    if (!item) throw new ApiError(404, `${this.resourceName} not found`);
    return item;
  }
}

module.exports = { CrudService };
