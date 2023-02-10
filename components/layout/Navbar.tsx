import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import nextLogo from "public/next.svg";
import { menu, close, bagIcon2 } from "public/assets/";
import { brownHat, men, women, jacket, sneakers } from "public/images";
import OneItem from "./oneItem";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [cartOverview, setCartOverview] = useState(false);

  useEffect(() => {
    setCartOverview(false);
  }, []);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar ">
      <Image src={nextLogo} alt="hoobank" width={100} height={50} />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 text-sm border-box md:text-lg lg:text-xl">
        <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
          <Link href="/">Shop</Link>
        </li>
        <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
          <a href="#">Contact</a>
        </li>
        <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
          <a href="#">Sign In</a>
        </li>
        <li className="relative mx-4 font-normal focus:font-semibold">
          <div
            onClick={() => setCartOverview(!cartOverview)}
            className="hover:cursor-pointer  hover:font-semibold  relative"
          >
            <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
              0
            </span>
          </div>
          {cartOverview && (
            <div className="absolute flex flex-col justify-between top-14 right-5 w-72 z-10 border-2 border-black bg-white p-4 ">
              <div className="space-y-4 mb-8">
                <OneItem id={1} name="Jafar" imageUrl={brownHat} qty={1} price={18} />
                <OneItem id={2} name="Jafar" imageUrl={men} qty={1} price={18} />
              </div>
              <Link
                href="/checkout"
                className="block uppercase px-8 w-full border-2 border-black py-4 hover:bg-black hover:text-white active:ring-4"
              >
                go to checkout
              </Link>
            </div>
          )}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <Image
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex z-10"
          } p-6 bg-black-gradient absolute top-10 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex items-start justify-center py-4 px-4 bg-white flex-1 flex-col gap-4 border-2 border-black">
            <li className="cursor-pointer box-border px-4 font-normal hover:font-semibold focus:font-semibold">
              <Link href="/">Shop</Link>
            </li>
            <li className="cursor-pointer box-border px-4 font-normal hover:font-semibold focus:font-semibold">
              <a href="#">Contact</a>
            </li>
            <li className="cursor-pointer box-border px-4 font-normal hover:font-semibold focus:font-semibold">
              <a href="#">Sign In</a>
            </li>
            <li className="relative box-border px-4 font-normal focus:font-semibold">
              <div
                onClick={() => setCartOverview(!cartOverview)}
                className="hover:cursor-pointer  hover:font-semibold  relative"
              >
                <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
                  0
                </span>
              </div>
              {cartOverview && (
                <div className="absolute flex flex-col justify-between top-14 right-5 w-72 z-10 border-2 border-black bg-white p-4 ">
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-x-4">
                      <Image src={brownHat} width={70} alt="cart item image" />
                      <div className="flex flex-col text-[18px]">
                        <h4>Blue Bearnie</h4>
                        <span>1 x 18$</span>
                      </div>
                    </div>
                    <div className="flex gap-x-4">
                      <Image src={brownHat} width={70} alt="cart item image" />
                      <div className="flex flex-col text-[18px]">
                        <h4>Blue Bearnie</h4>
                        <span>1 x 18$</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    className="block uppercase px-8 w-full border-2border-black py-4 hover:bg-black hover:text-white active:ring-4 transition-all duration-300 "
                  >
                    go to checkout
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
