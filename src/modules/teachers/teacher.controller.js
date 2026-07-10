const { createCrudController } = require('../../controllers/crud.controller');
const { teacherService } = require('./teacher.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(teacherService);

// Override create method to asynchronously forward teacher application to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await teacherService.create(req.body);

  // Perform background POST request to the external webhook
  try {
    const webhookUrl = env.TEACHER_FORM_WEBHOOK_URL || "http://ec2-43-205-221-251.ap-south-1.compute.amazonaws.com/api/candidate/webhook?secret=YourSuperSecretToken123";
    
    const payload = {
      email: item.email || "",
      fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
      fatherName: item.fatherName || "",
      phone: item.phone || "",
      dob: item.dob ? new Date(item.dob).toISOString().split('T')[0] : "",
      address: item.currentAddress || "",
      motherName: item.motherName || "",
      boardsToTeach: item.boardsToTeach ? item.boardsToTeach.join(', ') : "",
      boardsAlreadyTaught: item.boardsAlreadyTaught ? item.boardsAlreadyTaught.join(', ') : "",
      classesToTeach: item.classesToTeach ? item.classesToTeach.join(', ') : "",
      classesAlreadyTaught: item.classesAlreadyTaught ? item.classesAlreadyTaught.join(', ') : "",
      subjectsToTeach: item.subjectsToTeach ? item.subjectsToTeach.join(', ') : "",
      subjectsPreviouslyTaught: item.subjectsPreviouslyTaught ? item.subjectsPreviouslyTaught.join(', ') : "",
      mediumOfInstruction: item.mediumOfInstruction ? item.mediumOfInstruction.join(', ') : "",
      mostComfortableMedium: item.mostComfortableMedium || "",
      preferredLocations: item.preferredLocations ? item.preferredLocations.join(', ') : ""
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const responseBody = await response.text();
    console.log(`Successfully forwarded teacher application to webhook. Status: ${response.status}, Response: ${responseBody}`);
  } catch (error) {
    console.error(`Error forwarding teacher application to webhook: ${error.message}`);
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
