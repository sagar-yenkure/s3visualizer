import { Globe, Lock, Server, Shield } from "lucide-react";
import React from "react";

const SecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Security is Our Priority
          </h3>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We&apos;ve designed this application with security at its core. Your
            AWS credentials never leave your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-blue-300" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Client-Side Only</h4>
            <p className="text-blue-100">
              All operations happen in your browser. No data is sent to external
              servers.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Server className="w-8 h-8 text-blue-300" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Local Storage</h4>
            <p className="text-blue-100">
              Your AWS keys are stored locally in your browser&apos;s secure
              storage.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-300" />
            </div>
            <h4 className="text-xl font-semibold mb-3">
              Direct AWS Connection
            </h4>
            <p className="text-blue-100">
              Direct communication with AWS S3. No intermediary servers or data
              processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
