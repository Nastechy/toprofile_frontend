import Footer from "@/components/websites/Footer/footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsentProvider } from "@/components/cookies/CookieConsent";
import AnalyticsScripts from "@/components/cookies/AnalyticsScripts";
import CookieSettingsModal from "@/components/cookies/CookieSettingsModal";
import CookieBanner from "@/components/cookies/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toprofile",
  description: "A REAL ESTATE WEBSITE",
  icons: {
    icon: "/brand/to.jpeg",
    shortcut: "/brand/to.jpeg",
    apple: "/brand/to.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <CookieConsentProvider>
          {children}
          <Footer />
          <AnalyticsScripts />
          <CookieBanner />
          <CookieSettingsModal />
        </CookieConsentProvider>
      </body>
      {/* <body className={inter.className}>
        {children}
        <Footer />
      </body> */}
    </html>
  );
}
