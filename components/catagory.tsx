type Props = { srcProp: string; cat: string; maxW: string };

export default function Catagory({ srcProp, cat, maxW }: Props) {
  return (
    <div className="flex justify-center align-middle">
      <img src={srcProp} alt={cat} className="-z-10" />
      <div className="flex flex-col bg-slate-400/50 px-8 py-4">
        <span>{cat}</span>
        <span>Shop Now</span>
      </div>
    </div>
  );
}
