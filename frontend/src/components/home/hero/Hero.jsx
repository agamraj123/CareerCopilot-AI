import Container from "../../ui/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 min-h-screen flex items-center bg-slate-50">
      <HeroBackground />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroContent />
          <HeroDashboard />
        </div>
      </Container>
    </section>
  );
};

export default Hero;