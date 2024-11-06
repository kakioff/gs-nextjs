import localFont from "next/font/local";
import "@/styles/globals.scss"
import "@/styles/tailwind.scss"
import { Metadata } from "next";
import { Providers } from "./providers";
import Head from "@/components/head";
import clsx from "clsx";
import { SessionProvider } from "next-auth/react";
import Background from "@/components/ui/background";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GoodStuff",
  description: "网站",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="zh-CN"
      suppressHydrationWarning={true}
    >
      <body
        className={clsx(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <SessionProvider>
          <Providers
            className="h-full overflow-auto relative"
          >
            {/* <LoadingBar /> */}
            <Head />
            {children}
            <div>
              <Background
                mask="cursor"
                gradient={{
                  display: true,
                  opacity: 0.3
                }}
                dots={{
                  display: true,
                  opacity: 0.3
                }}
                lines={{
                  display: false
                }} />
            </div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
