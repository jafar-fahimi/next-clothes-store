import React, { useState } from "react";
import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

// function Signin(): NextPage { // wrong; Type 'Element' is not assignable to type 'NextPage<{}, {}>'.
const Signin: NextPage = function () {
  // or: = () => {}
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<null | AuthError>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (loading || localLoading) return <h2>Loading...</h2>;
  if (user) {
    alert("You are signed in!");
    router.push("/");
  }

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
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
  };

  const signUp = async (email: string, password: string) => {
    setLocalLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((err) => {
        alert(err.message);
        setError(err.message);
      })
      .finally(() => setLocalLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLocalLoading(true);
    // await func; so that its done completely, before other codes. not for then.
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((err) => {
        alert(err.message);
        setError(err.message);
      })
      .finally(() => setLocalLoading(false));
  };

  const onSubmitSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };
  const onSubmitSignUp: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password);
  };

  return (
    <section className="flex flex-col md:flex-row md:justify-center mx-auto gap-y-10 md:gap-y-0">
      <div className="w-full px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm mb-8 mt-1">Sign in with your email and password</p>
        <form onSubmit={handleSubmit(onSubmitSignIn)} action="#" method="post">
          <input
            type="email"
            placeholder="Email"
            onKeyDown={() => setError(null)}
            className={` placeholder-slate-600 py-[2px] border-b-2 block w-full lg:text-xl outline-none ${
              errors.email && "border-orange-500"
            }`}
            {...register("email", { required: true })}
          />
          <p className="py-2 mb-4 text-[13px] font-light text-orange-500">
            {errors.email && <span className="absolute">Please enter a valid email.</span>}
          </p>
          <input
            type="password"
            placeholder="Password"
            onKeyDown={() => setError(null)}
            className={`placeholder-slate-600 border-b-2 py-[2px] block w-full lg:text-xl outline-none ${
              errors.password && "border-orange-500"
            }`}
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 60,
            })}
          />
          <p className="py-2 mb-8 text-[13px] font-light text-orange-500">
            {errors.password && (
              <span className="absolute"> Your password must contain between 4 and 60 characters.</span>
            )}
          </p>
          <div className="flex justify-between gap-x-4 mt-4">
            <button className="flex-1 scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-black text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black transition-all duration-300">
              Sign in
            </button>
            <span
              onClick={signInWithGoogle}
              className="flex-1 hover:cursor-pointer text-center scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white border-2 border-transparent hover:border-blue-600 transition-all duration-300"
            >
              {/* can't be button! took me 2 days! */}
              Sign in with google
            </span>
          </div>
        </form>
      </div>
      <div className=" w-full px-8">
        <h2 className="text-xl font-semibold">New to My Ecommerce Website</h2>
        <p className="text-sm mb-8 mt-1">You can easily make an account. Feel free to sign up.</p>

        <form onSubmit={handleSubmit(onSubmitSignUp)} action="#" method="post">
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
};
export default Signin;
