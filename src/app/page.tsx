"use client";

import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { CredentialManager } from "@/components/CredentialManager";
import { FileExplorer } from "@/components/FileExplorer";
import { MockS3Service } from "@/services/MockS3Service";
import { AWSCredentials, S3Object } from "@/types";

function App() {
  const [credentials, setCredentials] = useState<AWSCredentials | null>(null);
  const [s3Service, setS3Service] = useState<MockS3Service | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  // Auto-connect with mock data on app start
  useEffect(() => {
    // Auto-connect with mock credentials for demo
    const mockCredentials: AWSCredentials = {
      accessKeyId: "DEMO_ACCESS_KEY",
      secretAccessKey: "demo_secret_key",
      region: "us-east-1",
      bucketName: "demo-bucket",
    };

    const service = new MockS3Service();
    setCredentials(mockCredentials);
    setS3Service(service);
    setIsConnected(true);
  }, []);

  const handleCredentialsSubmit = useCallback(async (creds: AWSCredentials) => {
    try {
      const service = new MockS3Service();
      await service.testConnection();

      // Save credentials to localStorage
      localStorage.setItem("aws-s3-credentials", JSON.stringify(creds));

      setCredentials(creds);
      setS3Service(service);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect to S3:", error);
      throw new Error("Invalid credentials or connection failed");
    }
  }, []);

  const handleCredentialsRemove = useCallback(() => {
    // Remove credentials from localStorage
    localStorage.removeItem("aws-s3-credentials");

    setCredentials(null);
    setS3Service(null);
    setIsConnected(false);
    setCurrentPath("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            AWS S3 Visual Manager
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional cloud storage management with intuitive visual
            interface
          </p>
        </header>

        {!isConnected ? (
          <CredentialManager onCredentialsSubmit={handleCredentialsSubmit} />
        ) : (
          <FileExplorer
            s3Service={s3Service}
            credentials={credentials}
            currentPath={currentPath}
            onPathChange={setCurrentPath}
            onDisconnect={handleCredentialsRemove}
          />
        )}
      </div>
    </div>
  );
}

export default App;
