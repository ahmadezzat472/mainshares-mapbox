import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselPage = () => {
  return (
    <Carousel
      opts={{
        align: "center",
        startIndex: 1,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="flex gap-[24px]">
        <CarouselItem className="lg:basis-1/4 max-w-[320px] pl-0 relative">
          <img src="/src/assets/image-1.png" alt="Slide 1" />
          <img
            src="/src/assets/icon-1.png"
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/4 max-w-[320px] pl-0 relative">
          <img src="/src/assets/image-2.png" alt="Slide 1" />
          <img
            src="/src/assets/icon-2.png"
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/4 max-w-[320px] pl-0 relative">
          <img src="/src/assets/image-3.png" alt="Slide 1" />
          <img
            src="/src/assets/icon-3.png"
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/4 max-w-[320px] pl-0 relative">
          <img src="/src/assets/image-4.png" alt="Slide 1" />
          <img
            src="/src/assets/icon-4.png"
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/4 max-w-[320px] pl-0 relative">
          <img src="/src/assets/image-5.png" alt="Slide 1" className="" />
          <img
            src="/src/assets/icon-5.png"
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] "
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselPage;
