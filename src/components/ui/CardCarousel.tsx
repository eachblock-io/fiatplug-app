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
import giftcard from "@/public/cards/Greendot.png";
import amazoncard from "@/public/cards/Amazon.jpg";
import steamcard from "@/public/cards/steam.jpg";
import RazorGoldcard from "@/public/cards/RazorGold.png";
import Image from "next/image";
import Link from "next/link";

const cardsData = [
  {
    id: 1,
    name: "Greendot",
    img: giftcard,
  },
  {
    id: 2,
    name: "Amazon",
    img: amazoncard,
  },
  {
    id: 3,
    name: "Steam",
    img: steamcard,
  },
  {
    id: 4,
    name: "Razor Gold",
    img: RazorGoldcard,
  },
];

export function CardCarousel() {
  return (
    <section>
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
              className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Link href={`/dashboard/giftcard/${data?.id}`}>
                <div className="p-1">
                  <Card className="lg:h-48 h-40 relative w-full flex aspect-square items-center justify-center lg:p-6">
                    <Image src={data?.img} alt={data?.name} priority fill />
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
