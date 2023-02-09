import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import nextLogo from "public/next.svg";
import { menu, close, bagIcon1, bagIcon2 } from "public/assets/";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

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
        <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
          <Link href="/checkout">
            <div className="relative">
              <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
                0
              </span>
            </div>
          </Link>
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
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
              <Link href="/">Shop</Link>
            </li>
            <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
              <a href="#">Contact</a>
            </li>
            <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
              <a href="#">Sign In</a>
            </li>
            <li className="cursor-pointer mx-4 font-normal hover:font-semibold focus:font-semibold">
              <Link href="/checkout">
                <div className="relative">
                  <Image src={bagIcon2} alt="shopping Cart" className="-z-10" width={25} />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-2 text-sm">
                    0
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
