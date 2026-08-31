import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionTrigger({
  children,
  onClick,
  isOpen,
  className = "",
}: {
  children: ReactNode;
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between py-5 text-left font-display text-base font-bold transition-colors hover:text-copper ${className}`}
    >
      {children}
      <ChevronDown
        className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""
          }`}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  isOpen,
  className = "",
}: {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${className}`}
      style={{
        maxHeight: isOpen ? "500px" : "0px",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="pb-5">{children}</div>
    </div>
  );
}
