import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next/dist/server/next";
import { NodeRequestHandler } from "next/dist/server/next-server";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
// a new stripe instance
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Res = {
  session?: Stripe.Checkout.Session;
  message?: string;
  statusCode?: number;
};

type LineItem = {
  price: string;
  quantity: number;
};

type Req = {
  lineItems: LineItem[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req?.body?.items ?? [],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.status(200).json({ session });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
