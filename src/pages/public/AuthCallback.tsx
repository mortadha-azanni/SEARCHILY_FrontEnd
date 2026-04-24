import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthProvider";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    if (hasHandledCallback.current) {
      return;
    }
    hasHandledCallback.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const hashRaw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
    const hashParams = new URLSearchParams(hashRaw);

    const token =
      queryParams.get("token") ||
      hashParams.get("token") ||
      queryParams.get("access_token") ||
      hashParams.get("access_token");
    const role = queryParams.get("role") || hashParams.get("role");

    if (token) {
      const resolvedRole = role ?? "user";
      login(token, resolvedRole);
      navigate(resolvedRole === "admin" ? "/admin" : "/app", { replace: true });
    } else {
      console.warn("[AuthCallback] Missing token in callback URL", {
        href: window.location.href,
        search: window.location.search,
        hash: window.location.hash
      });
      navigate("/auth", { replace: true });
    }
  }, [login, navigate]);

  return <p>Signing you in...</p>;
}