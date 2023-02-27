import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ItemPropsType } from "utils/types";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
// a new stripe instance
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Res = {
  session?: Stripe.Checkout.Session;
  message?: string;
  statusCode?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  if (req.method === "POST") {
    try {
      const sessionItem = {
        mode: "payment",
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        line_items: req.body.items.map((item: ItemPropsType) => ({
          price: item.id,
          quantity: item.qty,
        })),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };
      const session = await stripe.checkout.sessions.create(sessionItem);
      res.status(200).json({ session });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// line_items: req.body.items.map((item: ItemPropsType) => {
//   return {
//     price: item.id,
//     quantity: item.qty,
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.name,
//         images: [item.imageUrl],
//       },
//       unit_amount: item.price * 100,
//     },
//     adjustable_quantity: {
//       enabled: true,
//       minimum: 1,
//     },
//   };
// }),
