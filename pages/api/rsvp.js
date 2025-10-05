import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, ...data } = req.body; // include name

  try {
    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: "Please provide your name and either an email or a phone number." });
    }

    let emailSnapshot = { empty: true };
    let phoneSnapshot = { empty: true };

    const emailVal = typeof email === "string" ? email.trim() : "";
    const phoneVal = typeof phone === "string" ? phone.trim() : "";

    if (emailVal) {
      const emailQuery = query(collection(db, "rsvps"), where("email", "==", emailVal));
      emailSnapshot = await getDocs(emailQuery);
    }

    if (phoneVal) {
      const phoneQuery = query(collection(db, "rsvps"), where("phone", "==", phoneVal));
      phoneSnapshot = await getDocs(phoneQuery);
    }

    if (!emailSnapshot.empty || !phoneSnapshot.empty) {
      return res.status(400).json({ error: "RSVP already submitted for this email or phone number." });
    }

    const docRef = await addDoc(collection(db, "rsvps"), {
      name: name.trim(),
      email: emailVal || null,
      phone: phoneVal || null,
      ...data,
    });

    return res.status(200).json({ message: "RSVP saved", id: docRef.id });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return res.status(500).json({ error: "Failed to save RSVP" });
  }
}