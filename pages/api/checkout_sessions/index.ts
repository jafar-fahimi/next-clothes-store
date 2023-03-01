import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { connectDatabase, insertData } from "utils/db-utils";
import products from "utils/products";
import { ItemPropsType } from "utils/types";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});
// a new stripe instance
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Res = {
  session?: Stripe.Checkout.Session;
  message?: string;
  statusCode?: number;
  products?: [];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the mongodb database failed!" });
    return;
  }

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
        success_url: `${req.headers.origin}/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      };
      const session = await stripe.checkout.sessions.create(sessionItem);
      res.status(200).json({ session });
    } catch (err: any) {
      console.log("err : ", err.message);
    }
    try {
      // send decreased items to mongodb via :
      const newChangedData: any[] = [];
      const localProducts = products;
      // localProducts here is not same to products; Next has changed Img urls
      // so when fetching data back from mongodb don't use data's imgUrl
      const tempLocalProductsId: string[] = [];
      const bodyItems = req.body.items;
      for (let i = 0; i < bodyItems.length; i += 1) {
        for (let j = 0; j < localProducts.length; j += 1) {
          if (bodyItems[i].id === localProducts[j].id) {
            // we send equalent localProduct to mongodb not bodyItems, since bodyItems don't have all details:
            newChangedData.push({ ...localProducts[j], total: bodyItems[i].total });
            tempLocalProductsId.push(localProducts[j].id);
          } else if (!tempLocalProductsId.includes(localProducts[j].id))
            newChangedData.push(localProducts[j]);
          //tempLocalProductsId is to avoid duplicate data sending.
        }
      }

      let result;

      result = await insertData(client, "products", newChangedData as []);
      res.status(200).json({ message: "Products uploaded to mongodb!", products: newChangedData as [] });
      console.log("result insertData is ,", result);
    } catch (error: any) {
      console.log("error is : ", error.message);
      res.status(500).json({ statusCode: 500, message: (error as unknown as Error).message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
  client.close();
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
