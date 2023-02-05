import Image, { StaticImageData } from "next/image";
type Props = { srcProp: string | StaticImageData; cat: string };

export default function Catagory({ srcProp, cat }: Props) {
  return (
    <section>
      <div className="relative">
        <div className="w-80 h-80 -z-10 group">
          <Image
            alt="imgwww"
            className="group-hover:scale-105 transition-all duration-500"
            src={srcProp}
            width={300}
            height={300}
            quality={100}
          />
          <div className="absolute hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-40 bg-white/70 py-4 px-2 text-center">
            <h3 className="text-xl font-bold">{cat}</h3>
            <span className="text-lg">Shop Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
