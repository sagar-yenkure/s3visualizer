"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Cloud, AlertCircle, Shield, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { awsCredentialsSchema } from "@/zod/awsSchema";
import { regions } from "@/constants";
import { useTestS3Connection } from "@/features/S3Feature";

export const CredentialManager = () => {
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(awsCredentialsSchema),
    defaultValues: {
      accessKeyId: "",
      secretAccessKey: "",
      region: "ap-south-1",
      bucketName: "",
      expireDays: 7,
    },
  });

  const credentials = watch(); // for useTestS3Connection
  const { mutate, isPending: isConnecting } = useTestS3Connection(
    {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: credentials.region,
      bucketName: credentials.bucketName,
    },
    credentials.expireDays
  );

  const onSubmit = () => {
    setError(null);
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Cloud className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AWS S3 Manager
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Connect to your S3 bucket with secure credential management
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3 justify-center">
            <Shield className="w-5 h-5 text-emerald-600" />

            <p className="text-sm text-emerald-700">
              Your credentials are encrypted and stored locally. They never
              leave your browser.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white text-black rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {error && (
            <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Access Key ID *
              </label>
              <input
                {...register("accessKeyId")}
                className="w-full px-3 py-2.5 border rounded-lg text-sm"
                placeholder="AKIA********"
              />
              {errors.accessKeyId && (
                <p className="text-red-600 text-sm">
                  {errors.accessKeyId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Region *
              </label>
              <select
                {...register("region")}
                className="w-full px-3 py-2.5 border rounded-lg text-sm"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secret Key Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Secret Access Key *
            </label>
            <div className="relative">
              <input
                {...register("secretAccessKey")}
                type={showSecretKey ? "text" : "password"}
                placeholder="Enter your secret access key"
                className="w-full px-3 py-2.5 pr-10 border rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showSecretKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.secretAccessKey && (
              <p className="text-red-600 text-sm">
                {errors.secretAccessKey.message}
              </p>
            )}
          </div>

          {/* Bucket Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bucket Name *
            </label>
            <input
              {...register("bucketName")}
              placeholder="my-s3-bucket"
              className="w-full px-3 py-2.5 border rounded-lg text-sm"
            />
            {errors.bucketName && (
              <p className="text-red-600 text-sm">
                {errors.bucketName.message}
              </p>
            )}
          </div>

          {/* Expire Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Storage Duration (days) *
            </label>
            <input
              {...register("expireDays", { valueAsNumber: true })}
              type="number"
              className="w-full px-3 py-2.5 border rounded-lg text-sm"
              placeholder="7"
            />
            {errors.expireDays && (
              <p className="text-red-600 text-sm">
                {errors.expireDays.message}
              </p>
            )}
            {credentials.expireDays > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Credentials will be auto-removed after {credentials.expireDays}{" "}
                day
                {credentials.expireDays !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isConnecting}
            className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 disabled:bg-blue-300 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Cloud className="w-4 h-4" />
                Connect to S3
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
