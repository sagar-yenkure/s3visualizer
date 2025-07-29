"use client";

import { setupSteps } from "@/constants";
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";

const SetupGuide = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["cors"]);
  const [copiedItems, setCopiedItems] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const copyToClipboard = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItems((prev) => [...prev, itemId]);
    setTimeout(() => {
      setCopiedItems((prev) => prev.filter((id) => id !== itemId));
    }, 2000);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AWS S3 Setup Guide
          </h2>
          <p className="text-lg text-gray-600">
            Follow these steps to configure your AWS S3 bucket for use with this
            application.
          </p>
        </div>

        <div className="space-y-4">
          {setupSteps?.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);
            const IconComponent = section.icon;

            return (
              <div
                key={section.id}
                className={`bg-white rounded-lg border-2 ${section.borderColor} overflow-hidden`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-gray-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <IconComponent className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Steps:</h4>
                      <ol className="space-y-2">
                        {section.steps.map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {section.code && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              Configuration:
                            </h4>
                            <button
                              onClick={() =>
                                copyToClipboard(section.code, section.codeId)
                              }
                              className="flex hover:cursor-pointer items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                            >
                              {copiedItems.includes(section.codeId) ? (
                                <>
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span className="text-green-600">
                                    Copied!
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 text-gray-600" />
                                  <span className="text-gray-600">Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
