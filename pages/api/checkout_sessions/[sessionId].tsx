// to retrieve d session using sessionId
import { NextApiRequest, NextApiResponse } from "next";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = req.query;
  try {
    if (typeof sessionId == "string" && !sessionId.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession sessionId.");
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as unknown as Error).message });
  }
}
