import Link from "next/link";
import Image, { StaticImageData } from "next/image";
type Props = { srcProp: string | StaticImageData; cat: string };

export default function Catagory({ srcProp, cat }: Props) {
  return (
    <Link className="relative" href={`/${cat.toLowerCase()}`}>
      <div className="w-96 -z-10 group">
        <Image
          alt="Catagory Item Image"
          className="group-hover:scale-105 transition-all w-full h-full duration-500 flex-1"
          src={srcProp}
          quality={100}
        />
        <div className="absolute hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-40 bg-white/70 py-4 px-2 text-center">
          <h3 className="md:text-xl">{cat}</h3>
          <span className="font-thin">Shop Now</span>
        </div>
      </div>
    </Link>
  );
}
