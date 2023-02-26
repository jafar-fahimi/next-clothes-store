import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: any = null;
// stripe instance

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  }
  return stripePromise;
};

export default getStripe;
