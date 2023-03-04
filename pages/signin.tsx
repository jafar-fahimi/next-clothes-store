import React, { useState } from "react";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import SignUp from "components/user/signup";

type Inputs = {
  email: string;
  password: string;
};

// function Signin(): NextPage { // wrong; Type 'Element' is not assignable to type 'NextPage<{}, {}>'.
const Signin: NextPage = function () {
  // or: = () => {}
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState<null | AuthError>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  if (loading) return <h2 className="mt-10">Loading...</h2>;

  const signInAndLogGoogleUser = async () => {
    try {
      const { user } = await signInWithGoogle();
      router.push("/");
    } catch (error: any) {
      alert("Error occurred while sigining with google; " + error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    // await func; so that its done completely, before other codes. not for then.
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => router.push("/"))
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Incorrect Password for email.");
            break;
          case "auth/user-not-found":
            alert("There is no user associated with this email.");
            break;
          default:
            alert(error);
        }
      })
      .finally(() => {
        resetField("email");
        resetField("password");
      });
  };

  const onSubmitSignIn: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <section className="flex flex-col md:flex-row md:justify-center mx-auto gap-y-10 md:gap-y-0">
      <div className="w-full sm:px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm mb-8 mt-1">Sign in with your email and password</p>
        <form onSubmit={handleSubmit(onSubmitSignIn)} action="#" method="post">
          <input
            type="email"
            placeholder="Email"
            onKeyDown={() => setError(null)}
            className={` placeholder-slate-600 py-[2px] border-0 border-b-2 block w-full  lg:text-xl outline-none ${
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
            className={`placeholder-slate-600 border-0 border-b-2 py-[2x] block w-full  lg:text-xl outline-none ${
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
            <button className="flex-1 scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-black text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black transition-all  text-sm sm:text-base duration-300">
              Sign in
            </button>
            <button
              type="button"
              onClick={signInAndLogGoogleUser}
              className="flex-1 hover:cursor-pointer text-center scale-90 sm:scale-100 uppercase box-border sm:px-6 py-4 bg-blue-600 text-white hover:text-blue-600 hover:bg-white border-2 border-transparent text-sm sm:text-base hover:border-blue-600 transition-all duration-300"
            >
              {/* can't be button! took me 2 days! since by def button is; submit */}
              Sign in with google
            </button>
          </div>
        </form>
      </div>
      <div className="py-12 md:py-0 w-full sm:px-8">
        <h2 className="text-xl font-semibold">New to My Ecommerce Website</h2>
        <p className="text-sm mb-8 mt-1">You can easily make an account. Feel free to sign up.</p>
        <SignUp />
      </div>
    </section>
  );
};
export default Signin;
