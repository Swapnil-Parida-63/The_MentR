const { createCrudController } = require('../../controllers/crud.controller');
const { parentRegistrationService } = require('./parent-registration.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(parentRegistrationService);

// Override create method to forward parent registration to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await parentRegistrationService.create(req.body);

  // Perform non-blocking background POST request to the external webhook
  const webhookUrl = env.PARENT_FORM_WEBHOOK_URL;
  if (webhookUrl) {
    const payload = {
      type: "registration",
      parentName: item.parentName || "",
      phone: item.phone || "",
      location: item.location || "",
      studentName: item.studentName || "",
      schoolName: item.schoolName || "",
      board: item.board || "",
      class: item.class || ""
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded parent registration to webhook. Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding parent registration to webhook: ${error.message}`);
      });
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;

