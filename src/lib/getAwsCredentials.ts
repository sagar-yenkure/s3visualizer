"use client";

import { AWSCredentials } from "@/types";

export const getAwsCredentials = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("aws-s3-credentials");
    const expiry = localStorage.getItem("aws-s3-credentials-expiry");

    if (!raw || !expiry) return null;

    const expiresAt = parseInt(expiry);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      // Expired
      localStorage.removeItem("aws-s3-credentials");
      localStorage.removeItem("aws-s3-credentials-expiry");
      console.warn("AWS credentials expired and removed.");
      return null;
    }

    return raw;
  } catch (error) {
    console.error("Error getting AWS credentials:", error);
    return null;
  }
};

export const storeAwsCredentials = (
  credentials: AWSCredentials,
  expireDays: number
) => {
  const day = (Date.now() + expireDays * 24 * 60 * 60 * 1000).toString();

  localStorage.setItem("aws-s3-credentials", JSON.stringify(credentials));
  localStorage.setItem("aws-s3-credentials-expiry", day);
};
