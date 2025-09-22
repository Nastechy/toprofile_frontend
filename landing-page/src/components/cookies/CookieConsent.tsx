"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cookie-consent";

// ↑ Bump this when your policy changes (will re-ask users)
const CONSENT_VERSION = "2025-09-13";
// ↑ Re-ask after this many days (3 months here)
const CONSENT_TTL_DAYS = 90;

export type Consent = {
  necessary: true;      // always true
  analytics: boolean;
  marketing: boolean;
  version: string;
  consentedAt: string;  // ISO timestamp
};

type Ctx = {
  consent: Consent | null;
  setConsent: (c: Omit<Consent, "version" | "consentedAt" | "necessary"> & { necessary?: true }) => void;
  revoke: () => void;                // clears consent (banner will show)
  // UI controls
  isBannerOpen: boolean;
  setBannerOpen: (b: boolean) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieCtx = createContext<Ctx | null>(null);

function isExpired(consent: Consent) {
  const then = new Date(consent.consentedAt).getTime();
  const now = Date.now();
  const days = (now - then) / (1000 * 60 * 60 * 24);
  return days > CONSENT_TTL_DAYS;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [isBannerOpen, setBannerOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // Load stored consent once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Consent = JSON.parse(raw);
        const needsRenew = !saved.version || saved.version !== CONSENT_VERSION || isExpired(saved);
        if (!needsRenew) {
          setConsentState(saved);
          setBannerOpen(false);
          return;
        }
      }
    } catch {}
    // No valid consent → open banner
    setConsentState(null);
    setBannerOpen(true);
  }, []);

  const setConsent = (c: Omit<Consent, "version" | "consentedAt" | "necessary"> & { necessary?: true }) => {
    const value: Consent = {
      necessary: true,
      analytics: !!c.analytics,
      marketing: !!c.marketing,
      version: CONSENT_VERSION,
      consentedAt: new Date().toISOString(),
    };
    setConsentState(value);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch {}
    setBannerOpen(false);
  };

  const revoke = () => {
    setConsentState(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    // After revoke, show banner again
    setBannerOpen(true);
  };

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const value = useMemo<Ctx>(() => ({
    consent,
    setConsent,
    revoke,
    isBannerOpen,
    setBannerOpen,
    isSettingsOpen,
    openSettings,
    closeSettings,
  }), [consent, isBannerOpen, isSettingsOpen]);

  return <CookieCtx.Provider value={value}>{children}</CookieCtx.Provider>;
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieCtx);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
