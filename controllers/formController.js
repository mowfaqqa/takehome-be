const admin = require("firebase-admin");

exports.submitData = async (req, res) => {
  const db = admin.firestore();

  const { company, numUsers, numProducts, percentage, email } = req.body;

  try {
    const authorizedEmail = "admin@email.com";
    if (email !== authorizedEmail) {
      return res.status(403).json({ error: "Unauthorized to upload image" });
    }
    // Create a new document in the 'data' collection
    const dataRef = db.collection("data").doc();
    await dataRef.set({
      company,
      numUsers,
      numProducts,
      percentage,
      imageUrl: "",
    });
    res.status(200).json({ message: "Data submitted successfully" });
  } catch (error) {
    console.error("Error submitting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadImage = async (req, res) => {
  const db = admin.firestore();
  const storage = admin.storage().bucket();

  const { dataId } = req.params;
  const { email } = req.body;
  const authorizedEmail = "admin@email.com";

  try {
    // Check if the email is authorized to upload images
    if (email !== authorizedEmail) {
      return res.status(403).json({ error: "Unauthorized to upload image" });
    }

    const dataRef = db.collection("data").doc(dataId);

    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const imageFile = req.file;
    const imageUrl = `images/${dataId}_${imageFile.originalname}`;

    // Upload the image to Firebase Storage
    await storage.file(imageUrl).save(imageFile.buffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Update the 'imageUrl' field in the Firestore document
    await dataRef.update({ imageUrl });

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
};
exports.fetchData = async (req, res) => {
  const db = admin.firestore();
  const { email } = req.query; // Extract the email from the query parameter

  try {
    // Check if the email is authorized to fetch data
    const allowedEmail = "userc@example.com"; // Replace with the authorized email address

    if (email !== allowedEmail) {
      return res.status(403).json({ error: "Unauthorized to fetch data" });
    }

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
