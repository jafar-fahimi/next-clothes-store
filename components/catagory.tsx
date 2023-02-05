import Image, { StaticImageData } from "next/image";
type Props = { srcProp: string | StaticImageData; cat: string };

export default function Catagory({ srcProp, cat }: Props) {
  return (
      <div className="relative">
        <div className="w-80 -z-10 group">
          <Image
            alt="Catagory Item Image"
            className="group-hover:scale-105 transition-all duration-500 flex-1"
            src={srcProp} 
            quality={100}
          />
          <div className="absolute hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-40 bg-white/70 py-4 px-2 text-center">
            <h3 className="md:text-xl font-bold">{cat}</h3>
            <span className="md:text-lg">Shop Now</span>
          </div>
        </div>
      </div>
  );
}
