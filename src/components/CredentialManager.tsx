"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Key,
  Cloud,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { AWSCredentials } from "../types";
import { useTestS3Connection } from "@/features/S3Feature";
import { regions } from "@/constants";

export const CredentialManager = () => {
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [expireDays, setExpireDays] = useState<number>(7); // Default 7 days
  const [credentials, setCredentials] = useState<AWSCredentials>({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-south-1",
    bucketName: "",
  });

  const { mutate, isPending: isConnecting } = useTestS3Connection(credentials,expireDays);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!credentials) return;
    e.preventDefault();
    mutate();
  };

  const handleInputChange =
    (field: keyof AWSCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) setError(null);
    };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            AWS S3 Visual Manager
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional cloud storage management with intuitive visual
            interface
          </p>
        </header>

        <div className="px-6 py-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Your credentials are securely stored locally and never leave your
            browser.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Connect to AWS S3
                  </h2>
                  <p className="text-blue-100">
                    Enter your AWS credentials to get started
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 text-black">
              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Access Key ID
                  </label>
                  <input
                    type="text"
                    value={credentials.accessKeyId}
                    onChange={handleInputChange("accessKeyId")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="AKIA***********"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Region
                  </label>
                  <select
                    value={credentials.region}
                    onChange={handleInputChange("region")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  >
                    {regions?.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Secret Access Key
                </label>
                <div className="relative">
                  <input
                    type={showSecretKey ? "text" : "password"}
                    value={credentials.secretAccessKey}
                    onChange={handleInputChange("secretAccessKey")}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="*******************"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showSecretKey ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Bucket Name
                </label>
                <input
                  type="text"
                  value={credentials.bucketName}
                  onChange={handleInputChange("bucketName")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="my-s3-bucket"
                  required
                />
              </div>
              <div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Store credentials for (days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={expireDays}
                    onChange={(e) => setExpireDays(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter days eg. 7, 15, 30"
                    required
                  />
                </div>
                {expireDays > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Note: Your AWS credentials will be automatically removed
                    after{" "}
                    <span className="font-medium text-gray-700">
                      {expireDays} day{expireDays > 1 ? "s" : ""}
                    </span>{" "}
                    from your system.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-5 h-5" />
                    <span>Connect to S3</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
