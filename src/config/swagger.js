const swaggerJsdoc = require('swagger-jsdoc');
const { env } = require('./env');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TheMentR API',
      version: '1.0.0',
      description: 'Backend API documentation for TheMentR EdTech platform.'
    },
    servers: [{ url: `${env.API_BASE_URL}/api/v1` }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.routes.js', './src/routes.js']
});

const ok = { description: 'Successful response' };
const created = { description: 'Created successfully' };
const deleted = { description: 'Deleted successfully' };
const secured = [{ bearerAuth: [] }];

function crudPaths(base, tag, securedCrud = true) {
  const security = securedCrud ? secured : [];
  return {
    [base]: {
      get: { tags: [tag], summary: `List ${tag}`, security, parameters: commonListParams(), responses: { 200: ok } },
      post: { tags: [tag], summary: `Create ${tag}`, security, responses: { 201: created } }
    },
    [`${base}/{id}`]: {
      get: { tags: [tag], summary: `Get ${tag}`, security, parameters: idParam(), responses: { 200: ok } },
      patch: { tags: [tag], summary: `Update ${tag}`, security, parameters: idParam(), responses: { 200: ok } },
      delete: { tags: [tag], summary: `Delete ${tag}`, security, parameters: idParam(), responses: { 204: deleted } }
    }
  };
}

function idParam() {
  return [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }];
}

function commonListParams() {
  return [
    { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
    { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
    { name: 'sort', in: 'query', schema: { type: 'string', example: '-createdAt' } },
    { name: 'search', in: 'query', schema: { type: 'string' } }
  ];
}

swaggerSpec.tags = [
  'Auth',
  'Teachers',
  'Parent Requirements',
  'Parent Registrations',
  'Assessment Visits',
  'AVSAR',
  'TheMentR Online',
  'Olympiads',
  'Study Materials',
  'Participants',
  'Results',
  'Blogs',
  'Gallery',
  'Testimonials',
  'Organogram',
  'Contact Forms',
  'Payments',
  'Chatbot'
].map((name) => ({ name }));

swaggerSpec.paths = {
  ...swaggerSpec.paths,
  ...crudPaths('/teachers', 'Teachers'),
  ...crudPaths('/parent-requirements', 'Parent Requirements'),
  ...crudPaths('/parent-registrations', 'Parent Registrations'),
  ...crudPaths('/assessment-visits', 'Assessment Visits'),
  '/avsar/dashboard': {
    get: { tags: ['AVSAR'], summary: 'Dashboard analytics from assessment visit data', security: secured, responses: { 200: ok } }
  },
  '/thementr-online/teachers': {
    get: {
      tags: ['TheMentR Online'],
      summary: 'Search verified teachers',
      security: [],
      parameters: [
        { name: 'board', in: 'query', schema: { type: 'string' } },
        { name: 'class', in: 'query', schema: { type: 'string' } },
        { name: 'subject', in: 'query', schema: { type: 'string' } },
        { name: 'location', in: 'query', schema: { type: 'string' } },
        { name: 'teachingMode', in: 'query', schema: { type: 'string', enum: ['Online', 'Offline'] } },
        ...commonListParams()
      ],
      responses: { 200: ok }
    }
  },
  ...crudPaths('/olympiad/olympiads', 'Olympiads'),
  ...crudPaths('/olympiad/study-materials', 'Study Materials'),
  ...crudPaths('/olympiad/participants', 'Participants'),
  ...crudPaths('/olympiad/results', 'Results'),
  ...crudPaths('/blogs', 'Blogs', false),
  ...crudPaths('/gallery', 'Gallery', false),
  ...crudPaths('/testimonials', 'Testimonials', false),
  ...crudPaths('/organogram', 'Organogram'),
  '/organogram/tree': {
    get: { tags: ['Organogram'], summary: 'Return organization hierarchy as tree', security: [], responses: { 200: ok } }
  },
  ...crudPaths('/forms/contact', 'Contact Forms'),
  '/payments': {
    get: { tags: ['Payments'], summary: 'Payment placeholder endpoint', security: [], responses: { 200: ok } },
    post: { tags: ['Payments'], summary: 'Payment placeholder endpoint', security: [], responses: { 200: ok } }
  },
  '/chatbot/chat': {
    post: { tags: ['Chatbot'], summary: 'Chatbot placeholder endpoint', security: [], responses: { 200: ok } }
  }
};

module.exports = { swaggerSpec };
