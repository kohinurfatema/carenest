import Banner from "@/components/home/Banner";
import AboutSection from "@/components/home/AboutSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <AboutSection />
      <ServicesOverview />
      <Testimonials />
    </div>
  );
}
