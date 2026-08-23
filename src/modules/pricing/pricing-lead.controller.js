const { createCrudController } = require('../../controllers/crud.controller');
const { pricingLeadService } = require('./pricing-lead.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(pricingLeadService);

// Override create method to forward pricing lead to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await pricingLeadService.create(req.body);

  // Collect target webhooks (pricing webhook + parent webhook fallback)
  const webhooks = Array.from(new Set([
    env.PRICING_FORM_WEBHOOK_URL,
    env.PARENT_FORM_WEBHOOK_URL,
    "https://script.google.com/macros/s/AKfycbzieZGJ6EQCIAW81fS4v98VD8kYNoTcA8gub6q2ucBKnrcmH-rjfcgse4vnX9aeg_xZ/exec",
    "https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec"
  ].filter(Boolean)));

  const boardsStr = Array.isArray(item.boards) ? item.boards.join(', ') : (item.boards || "");
  const classesStr = Array.isArray(item.classes) ? item.classes.join(', ') : (item.classes || "");
  const subjectsStr = Array.isArray(item.subjects) ? item.subjects.join(', ') : (item.subjects || "");
  const categoriesStr = Array.isArray(item.categories) ? item.categories.join(', ') : (item.categories || "");

  const payload = {
    type: "pricing_response",
    fullName: item.fullName || "",
    name: item.fullName || "",
    parentName: item.fullName || "",
    phone: item.phone || "",
    email: item.email || "",
    isParent: item.isParent !== undefined ? (item.isParent ? "Yes" : "No") : "No",
    board: boardsStr,
    boards: boardsStr,
    class: classesStr,
    classes: classesStr,
    subject: subjectsStr,
    subjects: subjectsStr,
    categories: categoriesStr,
    selectedPriceCode: item.selectedPriceCode || "",
    selectedPriceRange: item.selectedPriceRange || "",
    priceCode: item.selectedPriceCode || "",
    priceRange: item.selectedPriceRange || ""
  };

  webhooks.forEach((url) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded pricing lead to webhook (${url}). Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding pricing lead to webhook (${url}): ${error.message}`);
      });
  });

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
