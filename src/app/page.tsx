"use client";

import { useRouter } from "next/navigation";
import CTA from "@/components/CTA";
import SecuritySection from "@/components/SecuritySection";
import DemoSection from "@/components/DemoSection";
import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import HeaderSection from "@/components/HeaderSection";
import { getAwsCredentials } from "@/lib/getAwsCredentials";

function App() {
  const router = useRouter();

  // if user don't have s3 credentials then redirect to credentials page
  const AWS_CREDENTIALS = getAwsCredentials();
  if (AWS_CREDENTIALS) return router.push("/gallery");

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      <HeroSection />
      <FeatureSection />
      <DemoSection />
      <SecuritySection />
      <CTA />
    </div>
  );
}

export default App;
