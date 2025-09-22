"use client";

import React from "react";
import Script from "next/script";
import { useCookieConsent } from "./CookieConsent";

export default function AnalyticsScripts() {
  const { consent } = useCookieConsent();

  if (!consent?.analytics) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
