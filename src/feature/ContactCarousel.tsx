import CarouselPage from "../components/Carousel";
import Contact from "../components/Contact";

const ContactCarousel = () => {
  return (
    <div className="flex flex-col gap-[96px]">
      <Contact
        src="/src/assets/Union.png"
        title="Join hundreds of certified local businesses"
        description="Be part of a growing network of locally owned businesses proudly making a difference in their communities. Certification is free, fast, and easy—and it helps customers find and support businesses like yours."
      />
      <CarouselPage />
    </div>
  );
};

export default ContactCarousel;
