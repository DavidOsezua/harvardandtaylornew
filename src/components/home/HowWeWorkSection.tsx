import Button from "../Button";
import FadeIn from "../FadeIn";

const HowWeWorkSection = () => {
  return (
    <section className="bg-cream w-full min-h-screen relative">
      {/* ── Mobile: stacked column ── */}
      <div className=" flex flex-col md:hidden py-10">
        {/* Top image */}
        <FadeIn from="left" className="w-[80%]">
          <img
            src="/howWeWorkLeft.webp"
            alt="Modern architecture"
            className="w-full object-cover"
          />
        </FadeIn>
        {/* Center content */}
        <FadeIn className="flex flex-col items-center justify-center text-center px-8 py-12">
          <h2
            className="text-gold uppercase mb-6 leading-snug"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            How we work and who
            <br />
            we help
          </h2>

          <Button to="/about" variant="filled" icon={<span>→</span>}>
            More Information
          </Button>
        </FadeIn>

        {/* Bottom image */}
        <FadeIn from="right" className="w-[80%] ml-auto">
          <img
            src="/howWeWorkRight.webp"
            alt="Elegant interior"
            className="w-full object-cover"
          />
        </FadeIn>
      </div>

      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex items-stretch min-h-70 py-10">
        {/* Left image */}
        <FadeIn from="left" className="w-[28%] shrink-0 absolute left-0">
          <img
            src="/howWeWorkLeft.webp"
            alt="Modern architecture"
            className="w-full h-full object-cover object-center"
          />
        </FadeIn>

        {/* Center content */}
        <FadeIn
          delay={100}
          className="flex flex-col items-center justify-center text-center px-8 py-24 grow"
        >
          <h2
            className="text-gold uppercase mb-6 leading-snug"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "0.05em",
            }}
          >
            How we work and who
            <br />
            we help
          </h2>

          <Button to="/services" variant="outline" icon={<span>→</span>}>
            More Information
          </Button>
        </FadeIn>

        {/* Right image */}
        <FadeIn
          from="right"
          delay={200}
          className="w-[28%] shrink-0 absolute right-0 bottom-40 "
        >
          <img
            src="/howWeWorkRight.webp"
            alt="Elegant interior"
            className="w-full h-full object-cover object-center"
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
