import { TargoHeroSection } from "@/components/home/TargoHeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { AboutBusiness } from "@/components/home/AboutBusiness";
import { BudgetEstimator } from "@/components/home/BudgetEstimator";

export default function Home() {
  return (
    <>
      <TargoHeroSection />
      <FeaturesGrid />
      <SocialProof />
      <AboutBusiness />
      <BudgetEstimator />
    </>
  );
}
