import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "utils/firebase";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userAtom } from "atoms/userAtom";

type Inputs = {
  email: string;
  password: string;
};

export default function SignUp() {
  const [localLoading, setLocalLoading] = useState(false);
  const [matchPasswordErr, setMatchPasswordErr] = useState(false);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const [nameInput, setNameInput] = useState<string>("");
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useRecoilState(userAtom);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const signUp = async (email: string, password: string) => {
    try {
      setLocalLoading(true);
      const { user }: any = await createAuthUserWithEmailAndPassword(email, password);
      var result = await createUserDocFromAuth(user, { displayName: nameInput });
      // same as directly await crea... both is-called = start-working-now
      setLocalLoading(false);
      router.push("/");
    } catch (error: any) {
      setLocalLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email is already in use.");
      } else {
        alert("user creation encountered an error. \n" + error.message);
      }
    }
    // resetting values:
    setNameInput("");
    resetField("email");
    resetField("password");
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
          className="border-0 placeholder-slate-600 py-[2px] border-b-2 block w-full lg:text-xl outline-none "
          required
          value={nameInput}
          onChange={(eve) => setNameInput(eve.target.value)}
        />
        <p className="py-2 mb-4 text-[13px] font-light text-orange-500"></p>
        <input
          type="email"
          placeholder="Email"
          className={`border-0 placeholder-slate-600 py-[2px] border-b-2 block w-full lg:text-xl outline-none ${
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
          className={`border-0 placeholder-slate-600 border-b-2 py-[2px] block w-full lg:text-xl outline-none ${
            errors.password && "border-orange-500"
          }`}
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 60,
          })}
        />
        <p className="py-2 mb-8 text-[13px] font-light text-orange-500">
          {errors.password && (
            <span className="absolute"> Your password must contain between 6 and 60 characters.</span>
          )}
        </p>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          ref={confirmPasswordRef}
          onKeyDown={() => setMatchPasswordErr(false)}
          className={`border-0 placeholder-slate-600 border-b-2 py-[2px] block w-full lg:text-xl outline-none ${
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
