const { createCrudController } = require('../../controllers/crud.controller');
const { olympiadService, participantService, resultService, studyMaterialService, olympiadInterestService } = require('./olympiad.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = {
  olympiads: createCrudController(olympiadService),
  participants: createCrudController(participantService),
  results: createCrudController(resultService),
  studyMaterials: createCrudController(studyMaterialService)
};

baseController.registerInterest = asyncHandler(async (req, res) => {
  const item = await olympiadInterestService.create(req.body);

  // Forward to Google Sheet Webhook with type: "olympiad"
  const webhookUrl = env.PARENT_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec";
  if (webhookUrl) {
    const payload = {
      type: "olympiad",
      board: item.board || "",
      class: item.class || "",
      school: item.school || "",
      location: item.location || "",
      email: item.email || "",
      mobile: item.mobile || "",
      alreadyEnrolled: item.alreadyEnrolled || ""
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded Olympiad interest to webhook. Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding Olympiad interest to webhook: ${error.message}`);
      });
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
