"use client";

import Script from "next/script";

export default function LogRocketProvider() {
  const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID;

  if (!logrocketId) return null;

  return (
    <Script
      id="logrocket-init"
      src="https://storage.googleapis.com/app.logrocket.com/LogRocket.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          const w = window as unknown as {
            LogRocket?: { init: (appId: string) => void };
          };
          if (w.LogRocket) {
            w.LogRocket.init(logrocketId);
          }
        } catch (e) {
          console.debug("LogRocket initialization bypassed:", e);
        }
      }}
    />
  );
}
