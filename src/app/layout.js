import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/styles/bootstrap_min.css';
import '@/styles/common.css';
import '@/styles/home.css';
import '@/styles/form-style.css';
import '@/styles/services.css';
import '@/styles/blog-create.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Divine Elite Wellness: Clinic and Academy',
  description: 'Discover Divine Elite Wellness Clinic – Gurgaons premier holistic health center offering slimming, fat reduction, facials, laser treatments, chemical peels, and spiritual healing therapies like Reiki, angel therapy, and aura cleansing.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
