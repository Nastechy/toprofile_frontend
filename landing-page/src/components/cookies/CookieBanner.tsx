
"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "./CookieConsent";
import React from "react";

type Props = {
  policyHref?: string;
  policyText?: string;
  copyTitle?: string;
  copy?: string;
};

export default function CookieBanner({
  // policyHref = "/cookie-policy",
  // policyText = "Cookie Policy",
  copyTitle = "We value your privacy",
  copy = "We use cookies to help our website and services work effectively. Some cookies are necessary and set automatically. Others are optional for analytics and personalization. You can accept all cookies, reject optional ones, or choose your preferences in Settings.",
}: Props) {
  const { consent, setConsent, isBannerOpen, setBannerOpen, openSettings } = useCookieConsent();

  const open = isBannerOpen && !consent;

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!consent) setBannerOpen(true);
  }, [consent, setBannerOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-5">
        <h3 className="text-[18px] md:text-[20px] font-semibold text-neutral-900 mb-2">
          {copyTitle}
        </h3>

        <p className="text-[13px] md:text-[14px] leading-relaxed text-neutral-800 max-w-5xl">
          {copy}{" "}
          {/* <a href={policyHref} className="underline text-neutral-900 hover:text-neutral-700">
            {policyText}
          </a> */}
          .
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <input
            type="checkbox"
            className="sr-only"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            aria-hidden
          />
          <input
            type="checkbox"
            className="sr-only"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            aria-hidden
          />

          <button
            onClick={openSettings}
            className="h-10 rounded cursor-pointer bg-neutral-200/80 hover:bg-neutral-300 text-neutral-900 text-sm px-4"
          >
            Cookie Settings
          </button>

          <button
            onClick={() => setConsent({ analytics: false, marketing: false })}
            className="h-10 rounded cursor-pointer border border-neutral-300 hover:bg-neutral-100 text-neutral-900 text-sm px-4"
          >
            Reject All
          </button>

          <button
            onClick={() => setConsent({ analytics: true, marketing: true })}
            className="h-10 rounded cursor-pointer bg-[#EB6D2F] hover:bg-[#080B20] text-white text-sm px-4"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
