import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseApp";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [localLoading, setLocalLoading] = useState(false);
  const [matchPasswordErr, setMatchPasswordErr] = useState(false);
  //   const confirmPasswordRef = useRef<MutableRefObject<LegacyRef<HTMLInputElement> | undefined>>();
  //   const confirmPasswordRef = useRef<LegacyRef<HTMLInputElement> | undefined>();
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signUp = async (email: string, password: string) => {
    setLocalLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLocalLoading(false));
  };

  const onSubmitSignUp: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (confirmPasswordRef.current?.value === password) await signUp(email, password);
    else setMatchPasswordErr(true);
  };
  if (localLoading) return <h3 className="text-3xl">Loading...</h3>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitSignUp)} action="#" method="post">
        <input
          type="text"
          placeholder="Display Name"
          className={` placeholder-slate-600 py-[2px] border-b-2 block w-full lg:text-xl outline-none `}
          required
        />
        <p className="py-2 mb-4 text-[13px] font-light text-orange-500"></p>
        <input
          type="email"
          placeholder="Email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          required
          ref={confirmPasswordRef}
          onKeyDown={() => setMatchPasswordErr(false)}
          className={`placeholder-slate-600 border-b-2 py-[2px] block w-full lg:text-xl outline-none ${
            errors.password && "border-orange-500"
          }`}
        />
        <p className="py-2 mb-8 text-[13px] font-light text-orange-500">
          {matchPasswordErr && (
            <span className="absolute">Your confirm password must match your first password.</span>
          )}
        </p>
        <button className="uppercase px-16 py-4 bg-black text-white hover:text-black hover:bg-white border-2 border-transparent hover:border-black transition-all duration-300">
          Sign up
        </button>
      </form>
    </div>
  );
}
