const FormEntry = require("../models/formModel");
const asyncHandler = require("express-async-handler");

const submitData = asyncHandler(async (req, res) => {
  const { company, numUsers, numProducts, percentage } = req.body;

  //controller to create a new form entry
  const formEntry = await FormEntry.create({
    company,
    numUsers,
    numProducts,
    percentage,
  });
  if (formEntry) {
    res.status(200).json({
      message: "Form submitted successfully",
      data: { ...formEntry },
      success: true,
    });
  } else {
    res.status(400).json({ message: "Invalide form data" });
  }
});

// controller for user C to fetch data
module.exports = {
  submitData,
};
