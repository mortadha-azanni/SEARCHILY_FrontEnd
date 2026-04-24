import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type State = "loading" | "success" | "already_verified" | "error";

const CONFIGS: Record<State, { icon: string; iconClasses: string; title: string }> = {
  loading:          { icon: "⏳", iconClasses: "bg-white/5 border border-white/10",         title: "Verifying your email…"  },
  success:          { icon: "✓",  iconClasses: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400", title: "Email verified!"         },
  already_verified: { icon: "✓",  iconClasses: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400", title: "Already verified"         },
  error:            { icon: "✕",  iconClasses: "bg-red-500/10 border border-red-500/20 text-red-400",             title: "Verification failed"      },
};

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (res.ok) {
          setState(data.message?.toLowerCase().includes("already") ? "already_verified" : "success");
          setMessage(data.message);
        } else {
          setState("error");
          setMessage(data.detail || "Verification failed.");
        }
      } catch {
        setState("error");
        setMessage("Network error. Please try again.");
      }
    })();
  }, [searchParams]);

  const cfg = CONFIGS[state];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-10 text-center shadow-2xl backdrop-blur-sm">

        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 ${cfg.iconClasses}`}>
          {cfg.icon}
        </div>

        <h1 className="text-2xl font-bold text-white tracking-tight mb-3">
          {cfg.title}
        </h1>

        <p className="text-sm text-white/50 leading-relaxed mb-8 min-h-[2.5rem]">
          {state === "loading" ? "Talking to the server, just a moment…" : message}
        </p>

        {/* Spinner */}
        {state === "loading" && (
          <div className="flex justify-center mb-2">
            <svg className="animate-spin h-7 w-7 text-indigo-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        )}

        {/* Actions */}
        {state !== "loading" && (
          <div className="flex flex-col gap-3">
            {(state === "success" || state === "already_verified") && (
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150"
              >
                Go to Dashboard →
              </button>
            )}

            {state === "error" && (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold text-sm transition-all duration-150"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full py-3 px-6 rounded-xl border border-white/10 hover:bg-white/5 active:scale-[0.98] text-white/60 hover:text-white/90 font-medium text-sm transition-all duration-150"
                >
                  Resend verification email
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}