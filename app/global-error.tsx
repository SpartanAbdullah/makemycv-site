"use client";

import { useEffect } from "react";

/* Last-resort boundary for the marketing site (audit 2026-06-12, gap #2).
 * Replaces the root layout on a layout-level crash, so it renders its own
 * <html>/<body> with inline styles only — no globals.css, no next/font.
 * Brand blue #2563eb, ink #0a0f1e. */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("[site/global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          fontFamily:
            "Inter, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            boxShadow: "0 16px 48px rgba(15, 23, 42, 0.08)",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 600,
              color: "#0a0f1e",
            }}
          >
            makemycv.ae hit an unexpected error
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#64748b",
            }}
          >
            Sorry — reloading usually fixes this. The CV builder itself is
            unaffected.
          </p>
          <a
            href="https://app.makemycv.ae"
            style={{
              display: "inline-block",
              marginTop: "24px",
              padding: "10px 22px",
              borderRadius: "999px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Open the CV builder
          </a>
          <p style={{ margin: "24px 0 0", fontSize: "12px", color: "#94a3b8" }}>
            <a href="mailto:hello@makemycv.ae" style={{ color: "#64748b" }}>
              hello@makemycv.ae
            </a>
            {error.digest ? ` — code ${error.digest}` : ""}
          </p>
        </div>
      </body>
    </html>
  );
}
