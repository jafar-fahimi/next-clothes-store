import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { NextPage } from "next";
import emailJs from "@emailjs/browser";

const Contact: NextPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  // success & error can be set on successMessage;& just if they're set, transition is shown!

  const formRef = useRef<HTMLFormElement>(null); // used just in sendEmailToMdbAndMyGmail

  const [formState, setFormState] = useState({
    first_name: "",
    email: "",
    phone_number: "",
    message: "",
    company: "",
    last_name: "",
  });

  const handleFormChange = (evt: any): void => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const resetFormValues = (): void => {
    setFormState({
      first_name: "",
      email: "",
      phone_number: "",
      message: "",
      company: "",
      last_name: "",
    });
  };

  // sending data to mongodb:
  const sendDataToMongodb = async () => {
    setIsSubmitLoading(true);
    try {
      await axios({
        url: "/api/message",
        headers: {
          "Content-Type": "application/json",
        },
        data: formState,
        method: "POST",
      });
    } catch (error) {
      setIsSubmitLoading(false);
      setSuccessMessage("error");
      if (error instanceof Error) {
        setErrorText(error.message);
        throw new Error(error.message); // will be catched in sendEmailToMdbAndMyGmail
      }
    }
  };

  const sendEmailToMdbAndMyGmail = async (event: any) => {
    try {
      await sendDataToMongodb();

      await emailJs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as unknown as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as unknown as string,
        formRef.current as unknown as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as unknown as string
      );
      // if its not set error by past sendsendDataToMongodb
      resetFormValues();
      if (successMessage !== "error") setSuccessMessage("success");
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      setSuccessMessage("error");
      if (error instanceof Error) {
        console.log("error.message is ", error.message);
        setErrorText(error.message);
      }
    }
  };

  const validateForm = (): boolean => {
    function validatePhoneNumber(input_str: any): boolean {
      var re = /^[0-9()-]+$/;
      return re.test(input_str);
    }

    function validateEmail(input_str: any): boolean {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(input_str);
    }

    if (
      !formState.email.includes("@") ||
      !formState.first_name ||
      formState.first_name.trim() === "" ||
      !formState.message ||
      formState.message.trim() === "" ||
      formState.last_name.trim() === "" ||
      !validatePhoneNumber(formState.phone_number) ||
      !validateEmail(formState.email)
    ) {
      return false;
    } else return true;
  };

  const sendDataHandler = async (eve: any) => {
    eve.preventDefault();
    if (!validateForm()) {
      setSuccessMessage("error");
      setErrorText("Invalid Inputs!");
      return;
    }
    // checkFormBeforeSending();
    // without await also they work
    await sendEmailToMdbAndMyGmail(eve);
  };
  return (
    <section className="isolate bg-white py-4 px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Sales</h2>
        <p className="mt-2 text-lg sm:leading-8 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit aspernatur quia.
        </p>
      </div>
      <form ref={formRef} method="POST" className="mx-auto mt-10 max-w-xl sm:mt-16">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold sm:leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                value={formState.first_name}
                type="text"
                name="first_name"
                id="first-name"
                required
                onChange={handleFormChange}
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
                value={formState.last_name}
                name="last_name"
                id="last-name"
                required
                onChange={handleFormChange}
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
                onChange={handleFormChange}
                value={formState.company}
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
                onChange={handleFormChange}
                value={formState.email}
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
              </div>
              <input
                type="tel"
                name="phone_number"
                id="phone-number"
                required
                value={formState.phone_number}
                onChange={handleFormChange}
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
                onChange={handleFormChange}
                value={formState.message}
                rows={4}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-sm sm:leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={async (eve: any) => await sendDataHandler(eve)}
            type="submit"
            disabled={isSubmitLoading}
            className={`block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              isSubmitLoading && "opacity-75"
            }`}
          >
            {isSubmitLoading ? "Sending..." : "Lets talk"}
          </button>
        </div>
      </form>

      <Transition appear show={successMessage !== ""} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setSuccessMessage("")}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed left-1/2 top-1/2" />
          </Transition.Child>

          <div className="fixed left-1/2 top-1/2 w-64 xsm:w-96 -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white border-2 ${
                    successMessage === "success" ? "border-blue-500" : "border-red-500"
                  } p-6 text-center align-middle shadow-xl transition-all ${
                    successMessage === "" && "hidden"
                  }`}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {`${
                      successMessage === "success"
                        ? "Successful Email!"
                        : successMessage === "error"
                        ? "Something went wrong!"
                        : ""
                    }`}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{`${
                      successMessage === "success"
                        ? "Your email was sent Successfully!"
                        : successMessage === "error"
                        ? errorText || "Your email wasn't sent!"
                        : ""
                    }`}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium ${
                        successMessage == "success"
                          ? "text-blue-900 focus-visible:ring-blue-500 hover:bg-blue-200 bg-blue-100"
                          : successMessage == "error"
                          ? "text-red-900 focus-visible:ring-red-500 hover:bg-red-200 bg-red-100"
                          : "hidden"
                      }  focus:outline-none focus-visible:ring-2
                      focus-visible:ring-offset-2`}
                      onClick={() => setSuccessMessage("")}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};
export default Contact;

// I had the same problem, gone to same path you mentioned.
// My problem solved when I changed to my MONGODB_URI username & password from my account. Also check that it must be exactly MONGODB_URI.
