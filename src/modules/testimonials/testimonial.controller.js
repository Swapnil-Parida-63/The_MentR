const { createCrudController } = require('../../controllers/crud.controller');
const { testimonialService } = require('./testimonial.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(testimonialService);

// Override create method to forward user feedback / testimonials to DB and Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await testimonialService.create(req.body);

  // Forward to Google Sheet Webhook with type: "feedback"
  const webhookUrl = env.PARENT_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec";
  if (webhookUrl) {
    const payload = {
      type: "feedback",
      name: item.name || req.body.name || "",
      role: item.role || req.body.role || "User",
      rating: item.rating || req.body.rating || 5,
      quote: item.quote || item.message || req.body.quote || req.body.message || "",
      location: item.location || req.body.location || "",
      createdAt: new Date().toISOString()
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded feedback to Google Sheet webhook. Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding feedback to Google Sheet webhook: ${error.message}`);
      });
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
