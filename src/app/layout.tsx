import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReduxProviders } from "./ReduxProviders";
import { AuthProvider } from "./SessionProvider";
import Preloader from "@/components/shared/Preloader";
const poppins = Poppins({ weight: ["400", "700", "600"], subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Blox AI",
  description:
    "Blox AI: Draw anything, receive explanations, and choose automatic or personalized documentation. Explore, learn, and document ideas effortlessly on our platform.",
  manifest: "/manifest.json",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "Blox AI",
    description:
      "Draw anything, receive explanations, and choose automatic or personalized documentation. Explore, learn, and document ideas effortlessly on our platform.",
    images: [
      {
        url: "https://i.postimg.cc/rzXzkRgz/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={poppins.className}>
          <ConvexClientProvider>
            <ReduxProviders>
            <ThemeProvider attribute="class">
              <AuthProvider>
                {children}
              </AuthProvider>
              <Toaster richColors theme="system" />
            </ThemeProvider>
            </ReduxProviders>
          </ConvexClientProvider>
          <Preloader />
        </body>
      </html>
  );
}
