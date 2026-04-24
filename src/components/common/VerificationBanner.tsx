import { useState } from "react";
import { api } from "../../services/api/client";

interface VerificationBannerProps {
  email: string;
  emailVerified: boolean | null;
}

export default function VerificationBanner({ email, emailVerified }: VerificationBannerProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [dismissed, setDismissed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (emailVerified || dismissed) return null;

  const handleSend = async () => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      await api.sendVerificationEmail(email);
      setStatus("sent");
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.detail || err?.response?.data?.message || err?.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between gap-3">

        {/* Left content */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Pulsing dot */}
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>

          <p className="text-sm text-white/80 leading-snug">
            {status === "sent" ? (
              <>
                <span className="text-emerald-400 font-medium">✓ Email sent!</span>
                {" "}Check your inbox at{" "}
                <span className="font-medium text-white/95">{email}</span>.
              </>
            ) : status === "error" ? (
              <span className="text-red-400">{errorMessage ?? "Something went wrong — please try again."}</span>
            ) : (
              <>
                <span className="font-medium text-white/95">Verify your email</span>
                {" "}to unlock all features. We'll send a link to{" "}
                <span className="font-medium text-white/95">{email}</span>.
              </>
            )}
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {status !== "sent" && (
            <button
              onClick={handleSend}
              disabled={status === "loading"}
              className="text-sm font-semibold px-4 py-1.5 rounded-md bg-white text-slate-900 hover:bg-white/90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Send verification →"
              )}
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="p-1.5 rounded-md text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors duration-150"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}