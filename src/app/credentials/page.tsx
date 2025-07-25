"use client";

import { CredentialManager } from "@/components/CredentialManager";
import { getAwsCredentials } from "@/lib/getAwsCredentials";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();

  // if user s3 credentials already exists then redirect to gallery
  const AWS_CREDENTIALS = getAwsCredentials();
  if (AWS_CREDENTIALS) return router.push("/gallery");

  return <CredentialManager />;
}

export default App;
