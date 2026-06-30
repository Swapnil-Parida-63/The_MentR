const { AssessmentVisit } = require('../assessment-visits/assessment-visit.model');
const { ParentRequirement } = require('../parents/parent-requirement.model');

async function distribution(model, field, match = {}) {
  return model.aggregate([
    { $match: match },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $project: { _id: 0, label: '$_id', count: 1 } },
    { $sort: { count: -1 } }
  ]);
}

class AvsarService {
  async dashboard() {
    const [statusCounts, boardDistribution, classDistribution, teacherPerformance, parentRequirementTrends] = await Promise.all([
      distribution(AssessmentVisit, 'status'),
      distribution(ParentRequirement, 'board'),
      distribution(ParentRequirement, 'class'),
      AssessmentVisit.aggregate([
        { $group: { _id: '$assignedTeacher', total: { $sum: 1 }, selected: { $sum: { $cond: [{ $eq: ['$status', 'Selected'] }, 1, 0] } }, rejected: { $sum: { $cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0] } } } },
        { $lookup: { from: 'teachers', localField: '_id', foreignField: '_id', as: 'teacher' } },
        { $unwind: { path: '$teacher', preserveNullAndEmptyArrays: true } },
        { $project: { teacherId: '$_id', teacherName: '$teacher.fullName', total: 1, selected: 1, rejected: 1, selectionRate: { $cond: [{ $eq: ['$total', 0] }, 0, { $multiply: [{ $divide: ['$selected', '$total'] }, 100] }] }, _id: 0 } },
        { $sort: { selectionRate: -1, total: -1 } }
      ]),
      ParentRequirement.aggregate([
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $project: { _id: 0, date: '$_id', count: 1 } },
        { $sort: { date: 1 } }
      ])
    ]);

    const total = statusCounts.reduce((sum, row) => sum + row.count, 0);
    const selected = statusCounts.find((row) => row.label === 'Selected')?.count || 0;
    const rejected = statusCounts.find((row) => row.label === 'Rejected')?.count || 0;

    return {
      selectionRate: total ? Number(((selected / total) * 100).toFixed(2)) : 0,
      rejectionRate: total ? Number(((rejected / total) * 100).toFixed(2)) : 0,
      statusCounts,
      boardDistribution,
      classDistribution,
      teacherPerformance,
      parentRequirementTrends
    };
  }
}

module.exports = { AvsarService };
