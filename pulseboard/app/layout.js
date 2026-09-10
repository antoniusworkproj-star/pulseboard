import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "NOCTURNE // Work Log",
  description: "Jurnal pekerjaan bertema cyberpunk dengan penyimpanan Google Sheets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
