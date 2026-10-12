const { createCrudController } = require('../../controllers/crud.controller');
const { careerLeadService } = require('./career-lead.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(careerLeadService);

// Override create method to forward career lead to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await careerLeadService.create(req.body);

  const webhookUrl = env.PRICING_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbzieZGJ6EQCIAW81fS4v98VD8kYNoTcA8gub6q2ucBKnrcmH-rjfcgse4vnX9aeg_xZ/exec";

  const payload = {
    type: "career",
    formType: "career",
    sheet: "Career Leads",
    sheetName: "Career Leads",
    fullName: item.fullName || "",
    name: item.fullName || "",
    phone: item.phone || "",
    email: item.email || "",
    role: item.role || "",
    appliedRole: item.role || "",
    openings: item.openings || "",
    department: item.department || "",
    location: item.location || "",
    experience: item.experience || "",
    // Fallback fields matching Sheet1 headers in case user hasn't updated Apps Script tab routing:
    isParent: "Career Applicant",
    board: item.role || "Career Opening",
    boards: item.role || "Career Opening",
    class: item.openings ? `${item.openings} Openings` : "Career Opening",
    classes: item.openings ? `${item.openings} Openings` : "Career Opening",
    subject: item.experience || "Not specified",
    subjects: item.experience || "Not specified",
    categories: "Career Lead"
  };

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: AbortSignal.timeout(6000)
      });
      const responseBody = await response.text();
      console.log(`Successfully forwarded career lead to webhook (${webhookUrl}). Status: ${response.status}, Response: ${responseBody}`);
    } catch (error) {
      console.error(`Error forwarding career lead to webhook (${webhookUrl}): ${error.message}`);
    }
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
