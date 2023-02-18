import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Signin() {
  initFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  

  const signIn = signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

    return (
    <section className="flex flex-col md:flex-row md:justify-center mx-auto gap-y-10 md:gap-y-0">
      <div className="w-full px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm mb-8 mt-1">Sign in with your email and password</p>
        <form action="#" method="post">
          <input
            type="email"
            placeholder="Email"
            required
            className="placeholder-slate-600 py-[2px] block w-full lg:text-xl outline-none"
          />
          <hr className="w-full mb-10" />
          <input
            type="password"
            placeholder="Password"
            required
            className="placeholder-slate-600  py-[2px] block w-full lg:text-xl outline-none"
          />
          <hr className="w-full mb-6" />
          <div className="flex justify-between gap-x-4 mt-4">
            <button className="flex-1 scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-black text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black transition-all duration-300">
              Sign in
            </button>
            <button
              onClick={() => signIn}
              className="flex-1 scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white border-2 border-transparent hover:border-blue-600 transition-all duration-300"
            >
              Sign in with google
            </button>
          </div>
        </form>
      </div>
      <div className=" w-full px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm mb-8 mt-1">Sign in with your email and password</p>

        <form action="#" method="post">
          <input
            type="text"
            placeholder="Display Name"
            className="placeholder-slate-600 block py-[2px] w-full lg:text-xl outline-none"
            required
          />
          <hr className="w-full mb-4 md:mb-10" />
          <input
            type="email"
            placeholder="Email"
            className="placeholder-slate-600 block py-[2px] w-full lg:text-xl outline-none"
            required
          />
          <hr className="w-full mb-4 md:mb-10" />
          <input
            type="password"
            placeholder="Password"
            className="placeholder-slate-600 block py-[2px] w-full lg:text-xl outline-none"
            required
          />
          <hr className="w-full mb-4 md:mb-10" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="placeholder-slate-600 block py-[2px] w-full lg:text-xl outline-none"
            required
          />
          <hr className="w-full mb-4 md:mb-10" />
          <button className="uppercase px-16 py-4 bg-black text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black transition-all duration-300">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
