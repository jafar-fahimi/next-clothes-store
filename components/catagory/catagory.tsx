import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { titleTypes } from "utils/types";
type Props = { srcProp: string | StaticImageData; cat: titleTypes };

export default function Catagory({ srcProp, cat }: Props) {
  let cat2 = undefined;
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
        <div className="absolute hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-40 bg-white/70 hover:bg-white/90 transition-all duration-300 py-4 px-2 text-center">
          <h3 className="md:text-xl">{cat}</h3>
          <span className="font-thin">Shop Now</span>
        </div>
      </div>
    </Link>
  );
}
