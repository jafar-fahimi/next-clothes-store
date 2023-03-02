import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { connectDatabase, insertData } from "utils/db-utils"; 
import { ItemPropsType } from "utils/types";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Res = {
  session?: Stripe.Checkout.Session;
  message?: string;
  statusCode?: number;
  products?: [];
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
        success_url: `${req.headers.origin}/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      };
      const session = await stripe.checkout.sessions.create(sessionItem);
      res.status(200).json({ session });
    } catch (err: any) {
      console.log("err : ", err.message);
      throw new Error(err.message);
    }

    // send decreased items to mongodb via :
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      throw new Error("Connecting to the mongodb database failed!");
    }
    try {
      const newChangedData: ItemPropsType[] = [];
      // const localProducts = products;
      const { preExistData } = req.body;
      // localProducts here is not same to products; Next has changed Img urls
      // so when fetching data back from mongodb don't use data's imgUrl
      const tempLocalProductsId: string[] = [];
      const bodyItems = req.body.items;
      for (let i = 0; i < bodyItems.length; i += 1) {
        for (let j = 0; j < preExistData.length; j += 1) {
          if (bodyItems[i].id == preExistData[j].id) {
            // we send equalent localProduct to mongodb not bodyItems, since bodyItems don't have all details:
            newChangedData.push({ ...preExistData[j], total: bodyItems[i].total });
          } else if (!tempLocalProductsId.includes(preExistData[j].id)) {
            newChangedData.push(preExistData[j]);
          }
          //tempLocalProductsId is to avoid duplicate data sending.
          tempLocalProductsId.push(preExistData[j].id);
        }
      }
      // console.log("tempLocalProductsId: ❤️", tempLocalProductsId);
      // console.log("bodyItems 😁😁", bodyItems);
      let result;
      // console.log("newChangedData 💳:", newChangedData);
      console.log("preExistData 🔝🔝:", preExistData);
      result = await insertData(client, "products", newChangedData as []);
      // res.status(200).json({ message: "Products uploaded to mongodb!", products: newChangedData as [] });
      console.log("result insertData is ,", result);
    } catch (error: any) {
      console.log("error is : ", error.message);
      // res.status(500).json({ statusCode: 500, message: (error as unknown as Error).message });
    }
    client.close();
  } else {
    // res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
// tempLocalProductsId: ❤️ [ 'price_1MeckVJna0QE1h10KOotv53u' ]
