import { Chakra_Petch, Space_Mono } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "ANTZ // DIARIUM",
  description: "Jurnal pekerjaan bertema cyberpunk dengan penyimpanan Google Sheets.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${chakraPetch.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
