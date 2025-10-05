import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone, ...data } = req.body;

    try {
      // Validate input: Ensure at least one identifier (email or phone) is provided
      if (!email && !phone) {
        return res.status(400).json({ error: "Please provide either an email or a phone number." });
      }

      // Check if RSVP already exists for email or phone
      let emailSnapshot = { empty: true };
      let phoneSnapshot = { empty: true };

      if (email) {
        const emailQuery = query(collection(db, "rsvps"), where("email", "==", email));
        emailSnapshot = await getDocs(emailQuery);
      }

      if (phone) {
        const phoneQuery = query(collection(db, "rsvps"), where("phone", "==", phone));
        phoneSnapshot = await getDocs(phoneQuery);
      }

      if (!emailSnapshot.empty || !phoneSnapshot.empty) {
        return res.status(400).json({ error: "RSVP already submitted for this email or phone number." });
      }

      // Save new RSVP
      const docRef = await addDoc(collection(db, "rsvps"), { email, phone, ...data });
      res.status(200).json({ message: "RSVP saved", id: docRef.id });
    } catch (error) {
      console.error("Error saving RSVP:", error);
      res.status(500).json({ error: "Failed to save RSVP" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}