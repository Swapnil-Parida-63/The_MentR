const { BaseRepository } = require('../../repositories/base.repository');
const { CrudService } = require('../../services/crud.service');
const { OrganogramDepartment } = require('./organogram.model');

class OrganogramService extends CrudService {
  async tree() {
    const departments = await OrganogramDepartment.find().lean();
    const nodeMap = new Map(departments.map((department) => [String(department._id), { ...department, children: [] }]));
    const roots = [];

    nodeMap.forEach((node) => {
      const parentId = node.parentDepartment ? String(node.parentDepartment) : null;
      if (parentId && nodeMap.has(parentId)) {
        nodeMap.get(parentId).children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}

const organogramService = new OrganogramService(new BaseRepository(OrganogramDepartment, ['departmentName', 'description']), 'Department', {
  populate: ['parentDepartment']
});

module.exports = { organogramService };
