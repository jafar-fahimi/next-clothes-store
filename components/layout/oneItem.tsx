import Image, { StaticImageData } from "next/image";
import React from "react";
type Props = {
  id: number;
  name: string;
  imageUrl: string | StaticImageData;
  price: number;
  qty?: number;
  countInStock?: number;
};

export default function OneItem(props: Props) {
  return (
    <div className="flex gap-x-4">
      <Image src={props.imageUrl} width={70} height={150} alt={props.name} />
      <div className="flex flex-col text-[18px]">
        <h4>{props.name}</h4>
        <span>
          {props.qty} x {props.price}
        </span>
      </div>
    </div>
  );
}
