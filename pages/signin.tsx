import React from "react";

export default function Signin() {
  return (
    <section className="flex flex-col md:flex-row md:justify-center mx-auto">
      <div className="w-full px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm">Sign in with your email and password</p>
        <form action="#" method="post">
          <input type="email" placeholder="Email" className="placeholder-slate-600  py-[2px] block w-full" />
          <hr className="w-full mb-6" />
          <input type="password" placeholder="Password" className="placeholder-slate-600  py-[2px] block w-full" />
          <hr className="w-full mb-6" />
          <div className="flex justify-between gap-x-4 mt-4">
            <button className="flex-1 uppercase px-6 py-2 bg-black text-white">Sign in</button>
            <button className="flex-1 uppercase px-6 py-2 bg-blue-600 text-white">Sign in with google</button>
          </div>
        </form>
      </div>
      <div className=" w-full px-8">
        <h2 className="text-xl font-semibold">I already have an account</h2>
        <p className="text-sm">Sign in with your email and password</p>

        <form action="#" method="post">
          <input type="text" placeholder="Display Name" className="placeholder-slate-600 block py-[2px] w-full" />
          <hr className="w-full mb-6"/>
          <input type="email" placeholder="Email" className="placeholder-slate-600 block py-[2px] w-full" />
          <hr className="w-full mb-6"/>
          <input type="password" placeholder="Password" className="placeholder-slate-600 block py-[2px] w-full" />
          <hr className="w-full mb-6"/>
          <input type="password" placeholder="Confirm Password" className="placeholder-slate-600 block py-[2px] w-full" />
          <hr className="w-full mb-6"/>
          <button className="uppercase px-10 py-2 bg-black text-white">Sign up</button>
        </form>
      </div>
    </section>
  );
}
