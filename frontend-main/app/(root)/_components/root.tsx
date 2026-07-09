import CTA from "@/components/cta";
import HeroSection from "@/features/home/components/hero-section";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { FeatureView } from "@/features/features/components/feature-view";
import HomeCarousel from "@/features/carousels/components/home-carousel";
import LatestNews from "@/features/home/components/latest-news";
import Testimonials from "@/features/testimonials/components/testimonials";
import Link from "next/link";

const Root = () => {
  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div className="bg-background">
        <HomeCarousel />
      </div>
      <div className="wrapper-body">
        <FeatureView />
      </div>
      <div className="wrapper-body">
        <Testimonials />
        <LatestNews />
      </div>
      <div className="relative border-y py-16 mt-16">
        <div
          className="absolute inset-0 -z-10
    bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)]
    bg-size-[16px_16px]"
        ></div>
        <CTA title="Ready to start your journey with us?">
          <Button size="lg" asChild>
            <Link href={paths.admission.getHref()}>Apply Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={paths.programs.getHref()}>View Program</Link>
          </Button>
        </CTA>
      </div>
    </div>
  );
};

export default Root;
