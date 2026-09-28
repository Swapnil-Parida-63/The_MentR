const { createCrudController } = require('../../controllers/crud.controller');
const { teacherService } = require('./teacher.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(teacherService);

// Override create method to asynchronously forward teacher application to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await teacherService.create(req.body);

  // Perform non-blocking background POST request to the external webhook
  const webhookUrl = env.TEACHER_FORM_WEBHOOK_URL || env.PARENT_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec";
  
  const payload = {
    type: "teacher",
    email: item.email || "",
    fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
    fatherName: item.fatherName || "",
    phone: item.phone || "",
    dob: item.dob ? new Date(item.dob).toISOString().split('T')[0] : "",
    address: item.currentAddress || "",
    motherName: item.motherName || "",
    boardsToTeach: Array.isArray(item.boardsToTeach) ? item.boardsToTeach.join(', ') : (item.boardsToTeach || ""),
    boardsAlreadyTaught: Array.isArray(item.boardsAlreadyTaught) ? item.boardsAlreadyTaught.join(', ') : (item.boardsAlreadyTaught || ""),
    classesToTeach: Array.isArray(item.classesToTeach) ? item.classesToTeach.join(', ') : (item.classesToTeach || ""),
    classesAlreadyTaught: Array.isArray(item.classesAlreadyTaught) ? item.classesAlreadyTaught.join(', ') : (item.classesAlreadyTaught || ""),
    subjectsToTeach: Array.isArray(item.subjectsToTeach) ? item.subjectsToTeach.join(', ') : (item.subjectsToTeach || ""),
    subjectsPreviouslyTaught: Array.isArray(item.subjectsPreviouslyTaught) ? item.subjectsPreviouslyTaught.join(', ') : (item.subjectsPreviouslyTaught || ""),
    mediumOfInstruction: Array.isArray(item.mediumOfInstruction) ? item.mediumOfInstruction.join(', ') : (item.mediumOfInstruction || ""),
    mostComfortableMedium: item.mostComfortableMedium || "",
    preferredLocations: Array.isArray(item.preferredLocations) ? item.preferredLocations.join(', ') : (item.preferredLocations || "")
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow"
  })
    .then(async (response) => {
      const responseBody = await response.text();
      console.log(`Successfully forwarded teacher application to webhook. Status: ${response.status}, Response: ${responseBody}`);
    })
    .catch((error) => {
      console.error(`Error forwarding teacher application to webhook: ${error.message}`);
    });

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
