import Image, { StaticImageData } from "next/image";
type Props = { srcProp: string | StaticImageData; cat: string };

export default function Catagory({ srcProp, cat }: Props) {
  return (
    <div>
      <div className="relative">
        <Image
          src={srcProp}
          alt={cat}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 hover:scale-125"
          width={300}
          height={300}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white/70 px-8 py-4 text-center">
          <h3 className="text-xl font-bold">{cat}</h3>
          <span className="text-lg">Shop Now</span>
        </div>
      </div>
    </div>
  );
}
