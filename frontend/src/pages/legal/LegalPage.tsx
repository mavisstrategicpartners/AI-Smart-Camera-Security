import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  title: string;
  updated?: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: Props) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="mb-6 text-sm">
        <Link to="/" className="text-amberdeep hover:underline">
          ← Back to shop
        </Link>
      </p>
      <h1 className="mb-2 font-display text-3xl font-semibold">{title}</h1>
      {updated && <p className="mb-8 text-xs text-muted">Last updated {updated}</p>}
      <div className="legal-content grid gap-4 text-[14.5px] leading-relaxed text-[#3A3527]">{children}</div>
    </div>
  );
}
