const express = require('express');

const router = express.Router();

router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/teachers', require('./modules/teachers/teacher.routes'));
router.use('/parent-requirements', require('./modules/parents/parent-requirement.routes'));
router.use('/parent-registrations', require('./modules/parents/parent-registration.routes'));
router.use('/assessment-visits', require('./modules/assessment-visits/assessment-visit.routes'));
router.use('/avsar', require('./modules/avsar/avsar.routes'));
router.use('/thementr-online', require('./modules/thementr-online/thementr-online.routes'));
router.use('/olympiad', require('./modules/olympiad/olympiad.routes'));
router.use('/blogs', require('./modules/blogs/blog.routes'));
router.use('/gallery', require('./modules/gallery/gallery.routes'));
router.use('/testimonials', require('./modules/testimonials/testimonial.routes'));
router.use('/organogram', require('./modules/organogram/organogram.routes'));
router.use('/forms/contact', require('./modules/forms/contact-form.routes'));
router.use('/payments', require('./modules/payment/payment.routes'));
router.use('/chatbot', require('./modules/chatbot/chatbot.routes'));
router.use('/ai', require('./modules/ai/ai.routes'));
router.use('/pricing-leads', require('./modules/pricing/pricing-lead.routes'));

module.exports = router;
