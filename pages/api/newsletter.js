import { connectDb, insertDoc } from "../../helpers/db-util";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDb();
    } catch (error) {
      res.status(500).json({ message: "Connection to db failed!" });
      return;
    }

    try {
      await insertDoc(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Insert data failed" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
