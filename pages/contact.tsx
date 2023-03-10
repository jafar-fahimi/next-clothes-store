import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { NextPage } from "next";

const Contact: NextPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const router = useRouter();
  const sendDataHandler = async () => {
    try {
      setIsSubmitLoading(true);
      const result: any = await axios({
        url: "/api/message",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          message: messageRef.current?.value,
          company: companyRef.current?.value,
          lastName: lastNameRef.current?.value,
        },
        method: "POST",
      });
      setIsSubmitLoading(false);

      // alert("Message Sent Successfully!");
    } catch (err: any) {
      setIsSubmitLoading(false);
      // In the catch block, the error which will always be 500 internal server error
      // alert(err.response.data);
    }
    router.push("/");
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  return (
    <section className="isolate bg-white py-4 px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Sales</h2>
        <p className="mt-2 text-lg sm:leading-8 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit aspernatur quia.
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-10 max-w-xl sm:mt-16">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold sm:leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                ref={nameRef}
                type="text"
                name="first-name"
                id="first-name"
                required
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold sm:leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                ref={lastNameRef}
                name="last-name"
                id="last-name"
                required
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold sm:leading-6 text-gray-900">
              Company <span className="text-slate-400 text-xs">(optional)</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                ref={companyRef}
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold sm:leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                required
                ref={emailRef}
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                {/* <ChevronDownIcon
                  className="pointer-events-none absolute top-0 right-3 h-full w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                required
                ref={phoneRef}
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-2 px-3.5 pl-20 text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                required
                ref={messageRef}
                rows={4}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                defaultValue={""}
              />
            </div>
          </div>
          {/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-indigo-600" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group> */}
        </div>
        <div className="mt-10">
          <button
            onClick={(eve: any) => {
              sendDataHandler();
              eve.preventDefault();
            }}
            disabled={isSubmitLoading}
            type="submit"
            className={`block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              isSubmitLoading && "opacity-75"
            }`}
          >
            {isSubmitLoading ? "Sending..." : "Lets talk"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Contact;
