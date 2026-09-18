import type { Category } from "../types";

interface Props {
  category: Category;
  size?: number;
}

export default function CameraMark({ category, size = 44 }: Props) {
  const stroke = "var(--color-amber)";

  if (category === "solar") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="6" y="24" width="16" height="11" rx="1.5" stroke={stroke} strokeWidth="1.6" />
        <line x1="6" y1="27.5" x2="22" y2="27.5" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <line x1="6" y1="31.5" x2="22" y2="31.5" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <line x1="11.3" y1="24" x2="11.3" y2="35" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <line x1="16.6" y1="24" x2="16.6" y2="35" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <circle cx="32" cy="18" r="8.5" stroke={stroke} strokeWidth="1.6" />
        <circle cx="32" cy="18" r="3.2" stroke={stroke} strokeWidth="1.6" />
        <path d="M22 35 L26 24" stroke={stroke} strokeWidth="1.6" />
      </svg>
    );
  }

  if (category === "outdoor") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="18" width="26" height="12" rx="4" stroke={stroke} strokeWidth="1.6" />
        <circle cx="32" cy="24" r="4.6" stroke={stroke} strokeWidth="1.6" />
        <circle cx="32" cy="24" r="1.6" fill={stroke} />
        <path d="M8 22 L4 20 M8 27 L4 29" stroke={stroke} strokeWidth="1.6" />
        <path d="M38 18 Q42 24 38 30" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="22" r="12" stroke={stroke} strokeWidth="1.6" />
      <circle cx="24" cy="22" r="5.4" stroke={stroke} strokeWidth="1.6" />
      <circle cx="24" cy="22" r="1.6" fill={stroke} />
      <rect x="20" y="9" width="8" height="4" rx="1.2" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}
