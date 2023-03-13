import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// doc to fetch d acutal document, getDoc is really getDocData, setDoc -> setDocData

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// without using .then, our func's result is just returned.
// .then((result) => {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   const token = credential?.accessToken;
//   // The signed-in user info.
//   const user = result.user;
//   // IdP data available using getAdditionalUserInfo(result)
//   // ...
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.customData.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });

// to store userAuth data(displayName,uid,email) inside firestore; doc(db, "users", userAuth.uid) if it not exists:
export const createUserDocFromAuth = async (userAuth: User, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid as string);
  // doc(db, 'collection/table', 'identifier; unique-id of this row')
  // it's just a ref; points to some unique point/path in db. // don't exist actually now.
  const userSnapshot = await getDoc(userDocRef); // return d data in d previous ref.
  // console.log(userSnapshot.exists()); // false if user with userAuth.id doesn't exist

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();
    try {
      // displayName is used & shown for users set in firestore.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: createdDate,
        ...additionalInformation,
      });
    } catch (error: any) {
      console.log("error at creating the user; ", error.message);
    }
  }
  return userDocRef; // if userSnapshot.exist() & not exist!
};

// to store user's order data(displayName,uid,email) inside firestore; doc(db, "users-orders", userAuth.uid) if it not exists:
export const createUserOrdersFromAuth = async (sessionAuth: any, additionalInformation: any) => {
  if (!sessionAuth) return;

  console.log("sessionAuth is ", sessionAuth);

  const userDocRef = doc(db, "users-orders", sessionAuth.id as string);
  const userSnapshot = await getDoc(userDocRef); // really getDocData! setDocData

  if (!userSnapshot.exists()) {
    const { displayName = "", email = "" } = { ...additionalInformation, ...sessionAuth };
    const createdDate = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: createdDate,
        ...additionalInformation,
      });
    } catch (error: any) {
      console.error("Error at storing user orders; " + error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  // const res = await createUserWithEmailAndPassword(auth, email, password);
  // return res; // same as:
  return await createUserWithEmailAndPassword(auth, email, password);
};
////
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// onAuthStateChanged is fired (callback is called) when auth changes:
export const onAuthStateChangedListener = (callback: (user: any) => void) =>
  onAuthStateChanged(auth, callback);

export { auth, googleProvider };
export default app;



// id: 'cs_test_a1rVUavQFGvlvM7cW6vGrwJS8iUoxnhsCk5x4bak8FVp1I6dVuCpKItN1o',
// object: 'checkout.session',
// after_expiration: null,
// allow_promotion_codes: null,
// amount_subtotal: 44000,
// amount_total: 44000,
// automatic_tax: { enabled: false, status: null },
// billing_address_collection: 'auto',
// cancel_url: 'http://localhost:3000/',
// client_reference_id: null,
// consent: null,
// consent_collection: null,
// created: 1678699475,
// currency: 'usd',
// custom_fields: [],
// custom_text: { shipping_address: null, submit: null },
// customer: null,
// customer_creation: 'if_required',
// customer_details: null,
// customer_email: null,
// expires_at: 1678785875,
// invoice: null,
// invoice_creation: {
//   enabled: false,
//   invoice_data: {
//     account_tax_ids: null,
//     custom_fields: null,
//     description: null,
//     footer: null,
//     metadata: {},
//     rendering_options: null
//   }
// },
// livemode: false,
// locale: null,
// metadata: {},
// mode: 'payment',
// payment_intent: null,
// payment_link: null,
// payment_method_collection: 'always',
// payment_method_options: {},
// payment_method_types: [ 'card' ],
// payment_status: 'unpaid',
// phone_number_collection: { enabled: false },
// recovered_from: null,
// setup_intent: null,
// shipping_address_collection: null,
// shipping_cost: null,
// shipping_details: null,
// shipping_options: [],
// status: 'open',
// submit_type: 'pay',
// subscription: null,
// success_url: 'http://localhost:3000/success?sessionId={CHECKOUT_SESSION_ID}',
// total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
// url: 'https://checkout.stripe.com/c/pay/cs_test_a1rVUavQFGvlvM7cW6vGrwJS8iUoxnhsCk5x4bak8FVp1I6dVuCpKItN1o#fidkdWxOYHwnPyd1blpxYHZxWjA0SGF2cFZPa2Q1VEA0bTQ1R0RBYlx%2Fckt2ZlZnTlJXSk18XWBQdmlScEs3cmBTblJMUV8xN3F%2FTkFSaW48VX1rYE8wYnB2PFFIUXFDdmZsNVBGQTVDMV9dNTVzZlRMc3d9TicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'
// }