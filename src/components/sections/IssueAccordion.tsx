'use client';

import { useState } from 'react';
import Image from 'next/image';

interface QuickSuggestion {
  id: string;
  label: string;
}

interface IssueAccordionItem {
  id: string;
  title: string;
  description?: string;
  isExpanded: boolean;
  quickSuggestions?: QuickSuggestion[];
}

export interface IssueAccordionProps {
  items: IssueAccordionItem[];
  onToggle: (itemId: string) => void;
  onIssueSubmit?: (itemId: string, data: any) => void;
  className?: string;
}

export function IssueAccordion({
  items,
  onToggle,
  onIssueSubmit,
  className = '',
}: IssueAccordionProps) {
  const [issueDescription, setIssueDescription] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSuggestionClick = (suggestion: string) => {
    setIssueDescription(prev => {
      if (prev) return `${prev}, ${suggestion.toLowerCase()}`;
      return suggestion;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 5));
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="
            bg-white
            border border-[#e5e7eb]
            rounded-xl
            shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
          "
        >
          {/* Accordion Header */}
          <button
            onClick={() => onToggle(item.id)}
            className="
              w-full
              flex items-start justify-between
              p-6
              border-b border-[#f3f4f6]
              hover:bg-gray-50/50 transition-colors
            "
          >
            <div className="flex flex-col gap-0.5 text-left">
              <h3 className="
                font-poppins font-semibold text-base
                text-[#111827] leading-normal
              ">
                {item.title}
              </h3>
              {item.description && (
                <p className="
                  font-poppins text-sm text-[#6b7280]
                  leading-normal
                ">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex-shrink-0 px-1 py-1.5">
              <div className="relative w-[12px] h-[7px]">
                <Image
                  src={item.isExpanded ? "/images/icons/chevron-up.svg" : "/images/icons/chevron-down.svg"}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </button>

          {/* Accordion Body */}
          {item.isExpanded && (
            <div className="p-6 flex flex-col gap-6">
              {/* Issue Description */}
              <div className="flex flex-col gap-2">
                <label className="
                  font-roboto-condensed font-medium text-sm
                  text-[#1f2937]
                ">
                  Describe the issue
                </label>
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="E.g. Cooling is not working properly, making strange noises, water leakage, etc."
                  className="
                    w-full h-[120px]
                    bg-white
                    border border-[#e5e7eb]
                    rounded-lg p-4
                    font-roboto-condensed text-xs text-[#6b7280]
                    placeholder:text-[#6b7280]
                    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]
                    focus:outline-none focus:border-[#02368c] focus:ring-1 focus:ring-[#02368c]
                    resize-none
                  "
                />

                {/* Quick Suggestions */}
                {item.quickSuggestions && (
                  <div className="flex gap-2 pt-3">
                    {item.quickSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.label)}
                        className="
                          bg-[#f9fafb]
                          border border-[#e5e7eb]
                          px-3 py-1.5
                          rounded-full
                          font-poppins text-sm text-[#777]
                          hover:bg-gray-100 transition-colors
                        "
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Urgency Level */}
              <div className="flex flex-col gap-2.5">
                <label className="
                  font-roboto-condensed font-medium text-sm
                  text-[#1f2937]
                ">
                  How urgent is this?
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUrgency('normal')}
                    className={`
                      flex-1
                      h-[53px] px-4 py-2
                      rounded-lg
                      border-2
                      font-poppins text-sm
                      transition-colors
                      ${urgency === 'normal'
                        ? 'border-[#02368c] text-[#02368c]'
                        : 'border-[rgba(0,0,0,0.1)] text-[#44474e] hover:border-gray-300'
                      }
                    `}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setUrgency('urgent')}
                    className={`
                      flex-1
                      h-[53px] px-4 py-2
                      rounded-lg
                      border-2
                      font-poppins text-sm
                      transition-colors
                      ${urgency === 'urgent'
                        ? 'border-[#02368c] text-[#02368c]'
                        : 'border-[rgba(0,0,0,0.1)] text-[#44474e] hover:border-gray-300'
                      }
                    `}
                  >
                    Urgent
                  </button>
                </div>
              </div>

              {/* Photo/Video Upload */}
              <div className="flex flex-col gap-0.5">
                <label className="
                  font-roboto-condensed font-medium text-sm
                  text-[#1f2937]
                ">
                  Add photo or video (Optional)
                </label>
                <p className="
                  font-poppins text-sm text-[#6b7280]
                  leading-normal
                ">
                  This helps your provider prepare and speeds up the job.
                </p>

                <div className="flex gap-3 pt-2.5">
                  {/* Camera Slot */}
                  <label className="
                    w-[140px] h-[140px]
                    bg-[#f9fafb]
                    border-2 border-dashed border-[#d1d5db]
                    rounded-lg
                    flex flex-col items-center justify-center gap-1
                    cursor-pointer
                    hover:bg-gray-100 transition-colors
                  ">
                    <div className="relative w-4 h-[14px]">
                      <Image
                        src="/images/icons/camera.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="
                      font-inter text-xs text-[#4b5563]
                      leading-normal
                    ">
                      Camera
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Add Slots */}
                  {[1, 2, 3, 4].map((slot) => (
                    <label
                      key={slot}
                      className="
                        w-[140px] h-[140px]
                        bg-[#f9fafb]
                        border border-[#e5e7eb]
                        rounded-lg
                        flex items-center justify-center
                        cursor-pointer
                        hover:bg-gray-100 transition-colors
                      "
                    >
                      <span className="
                        text-2xl text-[#9ca3af] font-black
                      ">
                        +
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
