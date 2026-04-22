"use client";

import { useEffect, useState } from "react";

const HOURS = [
  { day: 0, open: 18, close: 1  }, // Sunday
  { day: 1, open: 18, close: 2  }, // Monday
  { day: 2, open: 18, close: 2  }, // Tuesday
  { day: 3, open: 18, close: 2  }, // Wednesday
  { day: 4, open: 18, close: 3  }, // Thursday
  { day: 5, open: 18, close: 3  }, // Friday
  { day: 6, open: 18, close: 3  }, // Saturday
];

function getStatus(): { open: boolean; label: string } {
  const now   = new Date();
  const day   = now.getDay();
  const hour  = now.getHours();
  const slot  = HOURS.find((h) => h.day === day);
  if (!slot) return { open: false, label: "Chiuso oggi" };

  const pastOpen   = hour >= slot.open;
  const beforeClose = slot.close < slot.open
    ? hour < slot.close
    : hour < slot.close;
  const isOpen = slot.close < slot.open
    ? pastOpen || hour < slot.close
    : pastOpen && beforeClose;

  return isOpen
    ? { open: true,  label: `Aperto · fino alle ${slot.close}:00` }
    : { open: false, label: `Chiuso · apre alle ${slot.open}:00` };
}

export default function OpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    setStatus(getStatus());
    const t = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!status) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={status.label}
      className="inline-flex items-center gap-2.5 px-4 py-2 border border-cream-dark bg-cream-mid"
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${status.open ? "bg-emerald-600" : "bg-red-600"}`}
        aria-hidden="true"
      />
      <span className="font-sans-alt text-[10px] tracking-[0.3em] uppercase text-brown-3">
        {status.label}
      </span>
    </div>
  );
}
