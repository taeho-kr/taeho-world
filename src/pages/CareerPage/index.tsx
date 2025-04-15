import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import styleARImage from "./images/stylear.webp";
import { useState } from "react";
import Chip from "@/components/myUI/chip";

interface Career {
  company: string;
  product: string;
  domains: string[];
  start: string;
  end: string;
  url: string;
  image: any;
}

const careers: Career[] = [
  {
    company: "Deepixel",
    product: "StyleAR",
    domains: ["AI", "E-Commerce", "Beauty"],
    start: "2020-02",
    end: "2021-06",
    url: "https://www.stylear.ai/",
    image: styleARImage,
  },
];

const CareerPage = () => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <div className="w-full h-full min-h-[100vh] flex justify-center items-center">
      <Carousel className="w-[80%]">
        <CarouselContent>
          {careers.map((career, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="p-1">
                <Card
                  className="select-none cursor-pointer"
                  onMouseEnter={() => setHoveredItemIndex(index)}
                  onMouseLeave={() => setHoveredItemIndex(undefined)}
                >
                  <CardContent className="flex aspect-square items-center justify-center">
                    <img
                      src={career.image}
                      className="rounded-md hover:brightness-[0.3]"
                    />
                    {hoveredItemIndex === index && (
                      <div className="absolute pointer-events-none flex flex-col items-center">
                        <span>{career.product}</span>
                        <div className="flex flex-row gap-1">
                          {career.domains.map((domain) => (
                            <Chip>{domain}</Chip>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CareerPage;
