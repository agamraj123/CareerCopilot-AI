import Container from "../../ui/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
    return (
        <section className="relative isolate overflow-hidden bg-slate-50 py-24">
            <HeroBackground />

            <Container>
                <div className="relative z-20 grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative z-30">
                        <HeroContent />
                    </div>

                    <div className="relative z-20">
                        <HeroDashboard />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;