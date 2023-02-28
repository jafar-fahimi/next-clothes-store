import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertData } from "utils/db-utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const data = req.body;
    const client = await connectDatabase();
    const result = await insertData(client, "messages", {
      id: new Date(),
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
    });
    res.status(200).json({ result });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
