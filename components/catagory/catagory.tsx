import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { titleTypes } from "utils/types";
import { FunctionComponent } from "react";
type Props = { srcProp: string | StaticImageData; cat: titleTypes };

const Catagory: FunctionComponent<Props> = ({ srcProp, cat }) => {
   let cat2: string | undefined = undefined;
   if (cat == "watches") cat2 = "watch";
   if (cat == "bags") cat2 = "bag";

   return (
      <Link className="relative border-slate-100 border-2" href={`/${!cat2 ? cat.toLowerCase() : cat2}`}>
         <div className="-z-10 group">
            <Image
               alt="Catagory Item Image"
               className="group-hover:scale-105 transition-all w-full h-full duration-500 flex-1"
               src={srcProp}
               width={300}
               height={240}
            />
            <div className="absolute hover:cursor-pointer -translate-x-1/2 -translate-y-full top-1/2 left-1/2 w-40 bg-white/70 hover:bg-white/90 transition-all duration-300 py-4 px-2 text-center">
               <h3 className="md:text-xl">{cat}</h3>
               <span className="font-thin">Shop Now</span>
            </div>

            <div className="flex flex-row my-3 border-t-2 pt-4 justify-center">
               <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
               <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
               <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
               <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
               <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
            </div>
            <div className="flex flex-row my-3 justify-center">
               <a
                  className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs"
                  href="#"
               >
                  XL
               </a>
               <a
                  className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs"
                  href="#"
               >
                  XXL
               </a>
               <a
                  className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs"
                  href="#"
               >
                  L
               </a>
               <a
                  className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs"
                  href="#"
               >
                  M
               </a>
               <a
                  className="border-gray-300 border-2 text-gray-400 rounded-md px-2 py-1 mr-2 text-xs"
                  href="#"
               >
                  S
               </a>
            </div>
         </div>
      </Link>
   );
};
export default Catagory;
