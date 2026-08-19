import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { TermsOfService } from '../../features/legal/components/TermsOfService';
import { PrivacyPolicy } from '../../features/legal/components/PrivacyPolicy';

export default function LegalPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'terms';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-[#0d0f12] p-6 md:p-12 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#C8F13A]">
              Legal & Privacy
            </h1>
            <p className="mt-1 font-mono text-xs text-gray-400">
              Last Updated: October 24, 2026
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-full border border-[#C8F13A] px-4 py-2 text-xs font-semibold text-[#C8F13A] hover:bg-[#C8F13A] hover:text-black transition-all">
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <button
              onClick={() => setActiveTab('terms')}
              className={`rounded-xl px-4 py-3 text-sm font-semibold text-left transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#212429] text-[#C8F13A] border-l-4 border-[#C8F13A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Terms of Service
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`rounded-xl px-4 py-3 text-sm font-semibold text-left transition-all ${
                activeTab === 'privacy'
                  ? 'bg-[#212429] text-[#C8F13A] border-l-4 border-[#C8F13A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
          </div>

          {/* Main Box */}
          <div className="rounded-2xl border border-white/10 bg-[#16191e] p-6 md:p-8 md:col-span-3">
            {activeTab === 'terms' ? <TermsOfService /> : <PrivacyPolicy />}
          </div>
        </div>
      </div>
    </div>
  );
}
