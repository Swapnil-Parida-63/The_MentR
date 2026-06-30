const slugify = require('slugify');
const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { Blog } = require('./blog.model');

function normalizeSlug(data) {
  if (data.slug) return { ...data, slug: slugify(data.slug, { lower: true, strict: true }) };
  if (data.title) return { ...data, slug: slugify(data.title, { lower: true, strict: true }) };
  return data;
}

const blogService = new CrudService(new BaseRepository(Blog, ['title', 'slug', 'author', 'content']), 'Blog', {
  beforeCreate: normalizeSlug,
  beforeUpdate: normalizeSlug
});

module.exports = { blogService };
