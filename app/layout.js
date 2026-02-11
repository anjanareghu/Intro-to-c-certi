import "./globals.css";

export const metadata = {
  title: "Hackbells 3.0 — Certificate Verification",
  description:
    "Verify certificates issued by Hackbells 3.0 workshops. Scan the QR code on your certificate to confirm its authenticity.",
  keywords: [
    "Hackbells",
    "certificate verification",
    "C programming workshop",
    "Sree Buddha College of Engineering",
  ],
  openGraph: {
    title: "Hackbells 3.0 — Certificate Verification",
    description:
      "Official verification portal for Hackbells 3.0 workshop certificates.",
    type: "website",
    siteName: "Hackbells",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a1a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
