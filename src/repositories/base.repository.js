const { buildRegexSearch, getQueryOptions } = require('../utils/query-options');

class BaseRepository {
  constructor(model, searchFields = []) {
    this.model = model;
    this.searchFields = searchFields;
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id, populate = []) {
    return this.model.findById(id).populate(populate);
  }

  findOne(filter, projection) {
    return this.model.findOne(filter).select(projection);
  }

  updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async paginate(query = {}, baseFilter = {}, populate = []) {
    const { page, limit, skip, sort, search } = getQueryOptions(query);
    const filter = {
      ...baseFilter,
      ...buildRegexSearch(search, this.searchFields)
    };

    Object.entries(query).forEach(([key, value]) => {
      if (['page', 'limit', 'sort', 'search'].includes(key) || value === undefined || value === '') return;
      filter[key] = value;
    });

    const [items, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).populate(populate),
      this.model.countDocuments(filter)
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1
      }
    };
  }
}

module.exports = { BaseRepository };
