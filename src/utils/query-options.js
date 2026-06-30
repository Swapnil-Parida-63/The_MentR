function getQueryOptions(query) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const sort = query.sort || '-createdAt';
  const search = query.search?.trim();

  return { page, limit, skip, sort, search };
}

function buildRegexSearch(search, fields) {
  if (!search || !fields?.length) return {};
  const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  return { $or: fields.map((field) => ({ [field]: regex })) };
}

module.exports = { buildRegexSearch, getQueryOptions };
