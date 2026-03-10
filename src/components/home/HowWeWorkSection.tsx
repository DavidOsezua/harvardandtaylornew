import Button from "../Button";

const HowWeWorkSection = () => {
  return (
    <section className="bg-cream w-full">
      {/* ── Mobile: stacked column ── */}
      <div className=" flex flex-col md:hidden py-10">
        {/* Top image */}
        <div className="w-[80%]">
          <img
            src="/howWeWorkLeft.png"
            alt="Modern architecture"
            className="w-full object-cover"
          />
        </div>
        {/* Center content */}
        <div className="flex flex-col items-center justify-center text-center px-8 py-12">
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
        </div>

        {/* Bottom image */}
        <div className="w-[80%] ml-auto">
        <img
          src="/howWeWorkRight.png"
          alt="Elegant interior"
          className="w-full object-cover"
        />
        </div>
      </div> 

      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex items-stretch min-h-70 py-10">
        {/* Left image */}
        <div className="w-[28%] shrink-0">
          <img
            src="/howWeWorkLeft.png"
            alt="Modern architecture"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center justify-center text-center px-8 py-12 grow">
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

          <Button to="/about" variant="outline" icon={<span>→</span>}>
            More Information
          </Button>
        </div>

        {/* Right image */}
        <div className="w-[28%] shrink-0 ">
          <img
            src="/howWeWorkRight.png"
            alt="Elegant interior"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
