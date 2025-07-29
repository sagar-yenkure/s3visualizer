"use client";

import { useRouter } from "next/navigation";
import CTA from "@/components/CTA";
import SecuritySection from "@/components/SecuritySection";
import DemoSection from "@/components/DemoSection";
import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import { getAwsCredentials } from "@/lib/awsCredentials";
import SetupGuide from "@/components/SetupGuide";

function App() {
  const router = useRouter();

  // if user don't have s3 credentials then redirect to credentials page
  const AWS_CREDENTIALS = getAwsCredentials();
  if (AWS_CREDENTIALS) return router.push("/gallery");

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeatureSection />
      <DemoSection />
      <SetupGuide />
      <SecuritySection />
      <CTA />
    </div>
  );
}

export default App;
