export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "student" | "researcher" | "viewer";
  avatar: string;
  plan: "Free" | "Starter" | "Professional" | "Enterprise";
}

export interface DocumentItem {
  id: string;
  title: string;
  category: "Education & Study" | "Research & Academic" | "Legal & Contracts" | "Financial Reports" | "Books & Literature" | "Technical & Manuals";
  size: string;
  pages: number;
  uploadedAt: string;
  status: "indexed" | "processing" | "ready";
  accuracyScore: number;
  snippet: string;
  extractedText?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  citations?: {
    docName: string;
    page: number;
    quote: string;
  }[];
}

export interface BillingInvoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
  pdfUrl: string;
}
