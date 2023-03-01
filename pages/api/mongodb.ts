import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { connectDatabase, getAllData } from "utils/db-utils";

type Res = {
  session?: {};
  message?: string;
  statusCode?: number;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllData(client, "products", { _id: -1 });
      res.status(200).json({ session: documents });
      console.log("document is ", document);
      return documents;
    } catch (error) {
      res.status(500).json({ message: "Getting Products failed." });
    }
  }

  client.close();
}
