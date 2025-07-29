"use client";
import CryptoJS from "crypto-js";
import { AWSCredentials } from "@/types";

// encrypting the aws api keys
const encrypt = (data: object): string => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(
    json,
    process.env.NEXT_PUBLIC_SECRET_KEY!
  ).toString();
};

// decrypting the aws api keys
const decrypt = (cipherText: string): object | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      cipherText,
      process.env.NEXT_PUBLIC_SECRET_KEY!
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Failed to decrypt AWS credentials:", error);
    return null;
  }
};

// get AWS credentials from storage and decryption
export const getAwsCredentials = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("aws-s3-credentials");
    const expiry = localStorage.getItem("aws-s3-credentials-expiry");

    if (!raw || !expiry) return null;

    const expiresAt = parseInt(expiry);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      localStorage.removeItem("aws-s3-credentials");
      localStorage.removeItem("aws-s3-credentials-expiry");
      return null;
    }

    const decryptedCredentials = decrypt(raw);
    return decryptedCredentials ? JSON.stringify(decryptedCredentials) : null;
  } catch {
    return null;
  }
};

// save AWS credentials with encryption
export const storeAwsCredentials = (
  credentials: AWSCredentials,
  expireDays: number
) => {
  const day = (Date.now() + expireDays * 24 * 60 * 60 * 1000).toString();
  const encryptedCredentials = encrypt(credentials);

  localStorage.setItem("aws-s3-credentials", encryptedCredentials);
  localStorage.setItem("aws-s3-credentials-expiry", day);
};

//remove AWS credentials
export const removeAWSCredentials = () => {
  localStorage.removeItem("aws-s3-credentials");
  localStorage.removeItem("aws-s3-credentials-expiry");
};
