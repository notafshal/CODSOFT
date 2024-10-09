import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const Carasoul = () => {
  const fruits = ["apple", "mango", "orange", "banana"];
  return (
    <>
      {" "}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-lg mx-auto"
      >
        <CarouselContent>
          {fruits.map((fruit, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{fruit}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
export default Carasoul;
