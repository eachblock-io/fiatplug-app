"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CurrencyCarousel({ data, onClick, activeCurr }: any) {
  return (
    <section>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}>
        <CarouselContent className="-ml-1">
          {data?.map((data: any) => (
            <CarouselItem
              key={data?.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 basis-1/6">
              <button
                key={data?.id}
                onClick={() => onClick(data?.id)}
                className={`font-semibold text-gray-600 lg:text-md text-sm ${
                  activeCurr === data?.id && `border-b border-orange-500`
                }`}>
                {data?.attributes?.symbol}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
