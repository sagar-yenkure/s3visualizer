"use client";

import { FileExplorer } from "@/components/FileExplorer";
import { getAwsCredentials } from "@/lib/awsCredentials";
import { useRouter } from "next/navigation";
import React from "react";

const GalleryPage = () => {
  const router = useRouter();

  // if user don't have s3 credentials then redirect to credentials page
  const AWS_CREDENTIALS = getAwsCredentials();
  if (!AWS_CREDENTIALS) return router.push("/credentials");

  return <FileExplorer />;
};

export default GalleryPage;
