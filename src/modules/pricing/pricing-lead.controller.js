const { createCrudController } = require('../../controllers/crud.controller');
const { pricingLeadService } = require('./pricing-lead.service');
const { asyncHandler } = require('../../utils/async-handler');
const { env } = require('../../config/env');

const baseController = createCrudController(pricingLeadService);

// Override create method to forward pricing lead to the external Google Sheet webhook
baseController.create = asyncHandler(async (req, res) => {
  const item = await pricingLeadService.create(req.body);

  // Perform non-blocking background POST request to the external parent webhook
  const webhookUrl = env.PRICING_FORM_WEBHOOK_URL || env.PARENT_FORM_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbzieZGJ6EQCIAW81fS4v98VD8kYNoTcA8gub6q2ucBKnrcmH-rjfcgse4vnX9aeg_xZ/exec";
  if (webhookUrl) {
    const payload = {
      type: "pricing_response",
      fullName: item.fullName || "",
      phone: item.phone || "",
      email: item.email || "",
      isParent: item.isParent !== undefined ? item.isParent : false,
      boards: item.boards || [],
      classes: item.classes || [],
      subjects: item.subjects || [],
      categories: item.categories || [],
      selectedPriceCode: item.selectedPriceCode || "",
      selectedPriceRange: item.selectedPriceRange || ""
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    })
      .then(async (response) => {
        const responseBody = await response.text();
        console.log(`Successfully forwarded pricing lead to webhook. Status: ${response.status}, Response: ${responseBody}`);
      })
      .catch((error) => {
        console.error(`Error forwarding pricing lead to webhook: ${error.message}`);
      });
  }

  res.status(201).json({ success: true, data: item });
});

module.exports = baseController;
