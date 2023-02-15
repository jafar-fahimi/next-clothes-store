import React from "react";

export default function Signin() {
  return (
    <section className="flex flex-col md:flex-row md:justify-center mx-auto">
      <div className=" bg-red-400 w-full">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm">Sign in with your email and password</p>
        <form action="#" method="post">
          <input type="email" placeholder="Email" className="placeholder-slate-600" />
          <input type="password" placeholder="Password" className="placeholder-slate-600" />
          <div className="flex justify-between gap-x-4">
            <button className="flex-1 uppercase px-6 py-2 bg-black text-white">Sign in</button>
            <button className="uppercase px-6 py-2 bg-blue-600 text-white">Sign in with google</button>
          </div>
        </form>
      </div>
      <div className="bg-green-400 w-full">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm">Sign in with your email and password</p>

        <form action="#" method="post">
          <input type="text" placeholder="Display Name" className="placeholder-slate-600 block" />
          <input type="email" placeholder="Email" className="placeholder-slate-600 block" />
          <input type="password" placeholder="Password" className="placeholder-slate-600 block" />
          <input type="password" placeholder="Confirm Password" className="placeholder-slate-600 block" />
          <button className="uppercase px-6 py-2 bg-black text-white">Sign in</button>
        </form>
      </div>
    </section>
  );
}
