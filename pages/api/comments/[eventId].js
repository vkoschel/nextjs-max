import { connectDb, insertDoc, getAllDocs } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connection to db failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();

      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDoc(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Insert data failed" });
    }
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocs(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Connection to db failed!" });
    }
  }

  client.close();
}

export default handler;
