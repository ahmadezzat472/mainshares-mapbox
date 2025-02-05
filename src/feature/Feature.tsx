import Contact from "../components/Contact";
import Questions from "../components/Questions";
import ContactCarousel from "./ContactCarousel";

const Feature = () => {
  return (
    <div className="pt-[100px] md:pt-[120px] pb-[40px] md:pb-[48px] flex flex-col gap-[100px] md:gap-[160px]">
      <ContactCarousel />
      <Questions />
      <Contact
        backgroundColor="#CE6A45"
        title="Join hundreds of certified local businesses"
        description="Be part of a growing network of locally owned businesses proudly making a difference in their communities. Certification is free, fast, and easy—and it helps customers find and support businesses like yours."
        btnBackgroundColor="#FCFBF8"
        btnTxtColor="#132527"
        txtColor="#FCFBF8"
        src="/src/assets/Union3.png"
        isPadding={true}
      />
    </div>
  );
};

export default Feature;
