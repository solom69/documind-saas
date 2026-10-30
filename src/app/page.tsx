import Link from "next/link";
import { 
  FileCheck2, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  SearchCode, 
  Layers, 
  ArrowRight, 
  Lock,
  FileSpreadsheet,
  Cpu
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { PricingSection } from "@/components/landing/PricingSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
            DocuMind 2.0 Engine Now Available • Zero Hallucination Mode
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-tight sm:leading-none">
            Turn dense PDFs and contracts into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">verifiable truth</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop skimming 200-page vendor agreements, regulatory compliance guidelines, and HR handbooks. Ask questions in plain English and receive instant answers with clickable clause-level citations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Start Free Trial (No Card Required)
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#demo"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-sm transition-all border border-zinc-200 dark:border-zinc-800"
            >
              View Interactive Live Demo
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
              Trusted by legal, finance, and engineering teams at fast-growing companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-lg tracking-wider">ACME CORP</span>
              <span className="font-bold text-lg tracking-wider">VERITAS LEGAL</span>
              <span className="font-bold text-lg tracking-wider">NEXUS FINTECH</span>
              <span className="font-bold text-lg tracking-wider">HEALTHSYNC</span>
              <span className="font-bold text-lg tracking-wider">STRATA LABS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Enterprise Grade Intelligence
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Built for precision where errors cost millions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Clause-by-Clause Citation
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every AI response links directly to the specific page, line number, and highlighted excerpt in your original document.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Cross-Document Reasoning
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ask questions across 50 contracts simultaneously. Compare indemnity caps, renewal dates, and conflicting clauses across vendors in seconds.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Zero Training Guarantee
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your data stays strictly your data. We never train public models on your proprietary contracts, financials, or patents. AES-256 encrypted.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Complex Tables & Scanned OCR
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Multimodal OCR reconstructs nested balance sheets, profit-and-loss tables, and low-res faxed paperwork with surgical accuracy.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Role-Based Access Control (RBAC)
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Set document-level permissions. Ensure engineering cannot query executive payroll or board minutes while sharing technical specs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
              <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <SearchCode className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Developer API & Webhooks
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Automate document processing directly inside your product via REST API, Python SDK, and real-time webhook indexing callbacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* Pricing Section */}
      <PricingSection />

      {/* Enterprise Security Section */}
      <section id="security" className="py-20 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold mb-4 border border-zinc-700">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Bank-Grade Security
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Designed for sensitive legal, financial, and healthcare paperwork.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                We believe your internal IP should remain uncompromised. DocuMind implements end-to-end envelope encryption, strict isolation between tenant embeddings, and continuous penetration testing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>SOC2 Type II Certified & HIPAA Ready</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>GDPR, CCPA & EU AI Act Data Sovereignty Options</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Available on private VPC (AWS, GCP, Azure GovCloud)</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 font-mono text-xs text-zinc-400 space-y-3 shadow-2xl">
              <div className="text-emerald-400 font-bold">// Cryptographic Verification Envelope</div>
              <div className="text-zinc-500">POST /api/v1/documents/verify-grounding</div>
              <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">
                {`{
  "status": "grounded_truth",
  "document_id": "doc_99182a",
  "citation_entropy": 0.0014,
  "tamper_proof_hash": "sha256:8f4c...91a2",
  "data_retention_policy": "zero_cache_after_session"
}`}
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500">
                <span>Latency: 142ms</span>
                <span className="text-emerald-400 font-semibold">100% Cryptographically Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
              DM
            </div>
            <span>DocuMind</span>
            <span className="text-xs text-zinc-400 font-normal ml-2">© 2026 DocuMind Technologies, Inc.</span>
          </div>

          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300">Security Whitepaper</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-300">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
