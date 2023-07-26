const admin = require("firebase-admin");

exports.submitData = async (req, res) => {
  const db = admin.firestore();

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
  const db = admin.firestore();
  try {
    const dataRef = db.collection("data");
    const response = await dataRef.get();
    let resArray = [];
    response.forEach((doc) => {
      resArray.push(doc.data());
    });
    res.status(200).json({ data: resArray });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
