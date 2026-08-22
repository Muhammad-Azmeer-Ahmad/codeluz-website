import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { AboutBusiness } from "@/components/home/AboutBusiness";
import { BudgetEstimator } from "@/components/home/BudgetEstimator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <SocialProof />
      <AboutBusiness />
      <BudgetEstimator />
    </>
  );
}
