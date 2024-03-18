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
import Image from "next/image";
import Link from "next/link";

export function CardCarousel({ cards }: any) {
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
          {cards?.data?.map((data: any) => (
            <CarouselItem
              key={data?.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Link
                href={`/dashboard/giftcard/${data?.id}`}
                className="rounded-2xl lg:py-6">
                <div className="lg:h-48 h-40 shadow relative rounded-xl w-full flex aspect-square items-center justify-center overflow-hidden">
                  <Image
                    src={data?.attributes?.image}
                    alt={data?.attributes?.title}
                    priority
                    objectFit="fill"
                    height={300}
                    width={400}
                    className="rounded-lg w-full"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="lg:hidden" />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
}
