const admin = require("firebase-admin");

exports.submitData = async (req, res) => {
  const { company, numUsers, numProducts, percentage } = req.body;

  try {
    // Create a new document in the 'data' collection
    await db.collection("data").add({
      company,
      numUsers,
      numProducts,
      percentage,
    });

    res.status(200).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchData = async (req, res) => {
  try {
    const dataEntries = [];
    // Fetch all documents from the 'data' collection
    const snapshot = await db.collection("data").get();

    snapshot.forEach((doc) => {
      dataEntries.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(dataEntries);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
