import { MongoClient } from "mongodb";
import { USER, PASS } from "../../config"

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${USER}:${PASS}@cluster0.l3f7b.mongodb.net/newsletter?retryWrites=true&w=majority`
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });

    client.close();
    res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
