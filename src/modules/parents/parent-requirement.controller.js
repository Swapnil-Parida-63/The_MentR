const { createCrudController } = require('../../controllers/crud.controller');
const { parentRequirementService } = require('./parent-requirement.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(parentRequirementService);

// Override create method to forward parent requirement to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await parentRequirementService.create(req.body);

  // Perform non-blocking background POST request to the external webhook
  const webhookUrl = env.PARENT_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec";
  if (webhookUrl) {
    const payload = {
      type: "requirement",
      parentName: item.parentName || "",
      phone: item.phone || "",
      email: item.email || "",
      location: item.location || "",
      studentName: item.studentName || "",
      specificSubject: item.specificSubject || "",
      board: item.board || "",
      class: item.class || "",
      learningMode: item.learningMode || "",
      preferredTiming: item.preferredTiming || "",
      additionalNotes: item.additionalNotes || ""
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded parent requirement to webhook. Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding parent requirement to webhook: ${error.message}`);
      });
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;

