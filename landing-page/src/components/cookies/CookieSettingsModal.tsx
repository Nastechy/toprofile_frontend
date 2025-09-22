"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "./CookieConsent";
import React from "react";

export default function CookieSettingsModal() {
    const { consent, setConsent, revoke, isSettingsOpen, closeSettings } = useCookieConsent();
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        setAnalytics(!!consent?.analytics);
        setMarketing(!!consent?.marketing);
    }, [consent, isSettingsOpen]);

    if (!isSettingsOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                <div className="px-5 py-4 border-b">
                    <h2 className="text-base font-semibold">Cookie Settings</h2>
                </div>

                <div className="px-5 py-4 space-y-4 text-sm">
                    <p className="text-neutral-700">
                        Control how we use cookies on this device. Necessary cookies are always enabled.
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">Analytics cookies</div>
                                <div className="text-neutral-600 text-xs">Help us understand how the site is used.</div>
                            </div>
                            <input
                                type="checkbox"
                                checked={analytics}
                                onChange={(e) => setAnalytics(e.target.checked)}
                                aria-label="Enable analytics cookies"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">Marketing cookies</div>
                                <div className="text-neutral-600 text-xs">Personalize offers and measure campaigns.</div>
                            </div>
                            <input
                                type="checkbox"
                                checked={marketing}
                                onChange={(e) => setMarketing(e.target.checked)}
                                aria-label="Enable marketing cookies"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-5 py-4 border-t flex gap-2 justify-end">
                    <button
                        onClick={() => { revoke(); closeSettings(); }}
                        className="px-3 py-2 text-sm border rounded cursor-pointer"
                        title="Clear your cookie choices and show banner again"
                    >
                        Revoke consent
                    </button>
                    <button
                        onClick={() => { setConsent({ analytics, marketing }); closeSettings(); }}
                        className="px-3 py-2 text-sm bg-neutral-900 text-white rounded cursor-pointer"
                    >
                        Save settings
                    </button>
                    <button
                        onClick={closeSettings}
                        className="px-3 py-2 text-sm rounded cursor-pointer border"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
