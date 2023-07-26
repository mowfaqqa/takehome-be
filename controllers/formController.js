const admin = require("firebase-admin");
const storage = admin.storage().bucket();

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
  const {dataId} = req.params;
  const { email } = req.body
  const authorizedEmail = "admin@email.com";

  try {
    // Check if the email is authorized to upload images
    if (email !== authorizedEmail) {
      return res.status(403).json({ error: 'Unauthorized to upload image' });
    }

    const dataRef = db.collection('data').doc(dataId);

    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
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

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}
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
