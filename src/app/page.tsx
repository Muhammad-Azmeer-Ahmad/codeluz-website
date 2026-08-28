import { ModernHero } from "@/components/home/ModernHero";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { AboutBusiness } from "@/components/home/AboutBusiness";
import { BudgetEstimator } from "@/components/home/BudgetEstimator";

export default function Home() {
  return (
    <>
      <ModernHero />
      <FeaturesGrid />
      <SocialProof />
      <AboutBusiness />
      <BudgetEstimator />
    </>
  );
}
