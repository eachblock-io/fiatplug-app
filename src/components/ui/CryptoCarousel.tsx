"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import adds from "@/public/crypto.png";
import adds1 from "@/public/ads-1.png";
import adds2 from "@/public/adds2.png";
import Image from "next/image";
import Link from "next/link";

const cardsData = [
  {
    id: 1,
    name: "Greendot",
    img: adds,
  },
  {
    id: 2,
    name: "Amazon",
    img: adds1,
  },
  {
    id: 3,
    name: "Steam",
    img: adds2,
  },
];

export function CryptoCarousel() {
  return (
    <section className=" w-full">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}>
        <CarouselContent className="-ml-1">
          {cardsData?.map((data) => (
            <CarouselItem
              key={data?.id}
              className="pl-4 md:basis-1/2 lg:basis-1/2">
              <div className="p-1">
                <Card className="lg:h-52 h-[140px] relative w-full flex aspect-square items-center justify-center lg:p-6">
                  <Image src={data?.img} alt={data?.name} priority fill />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
}
