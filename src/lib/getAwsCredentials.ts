"use client";

export const getAwsCredentials = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("aws-s3-credentials");
    if (!raw) return null;
    return raw;
  } catch (error) {
    return null;
  }
};
