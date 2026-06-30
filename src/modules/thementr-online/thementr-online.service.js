const { Teacher } = require('../teachers/teacher.model');

class TheMentROnlineService {
  async search(query) {
    const filter = { verificationStatus: 'Verified' };

    if (query.board) filter.boards = query.board;
    if (query.class) filter.classes = query.class;
    if (query.subject) filter.subjects = query.subject;
    if (query.location) filter.city = new RegExp(query.location, 'i');
    if (query.teachingMode === 'Online') filter.onlineTeaching = true;
    if (query.teachingMode === 'Offline') filter.offlineTeaching = true;

    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const sort = query.sort || '-createdAt';

    const [items, total] = await Promise.all([
      Teacher.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Teacher.countDocuments(filter)
    ]);

    return { items, pagination: { total, page, limit, pages: Math.ceil(total / limit) || 1 } };
  }
}

module.exports = { TheMentROnlineService };
