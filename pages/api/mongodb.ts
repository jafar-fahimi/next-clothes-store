import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

type Res = {
  session?: Stripe.Checkout.Session;
  message?: string;
  statusCode?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {}
