import './globals.css';
import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'F.S.Infrastructure - Premium Interior Design & Architecture | Kolkata',
  description: 'Leading interior design and architecture firm in Kolkata specializing in sustainable residential and commercial projects. 8+ years of excellence by Er. Farez Ahmed Gazi.',
  keywords: 'interior design, architecture, Kolkata, sustainable design, residential, commercial, F.S.Infrastructure',
  authors: [{ name: 'F.S.Infrastructure' }],
  openGraph: {
    title: 'F.S.Infrastructure - Premium Interior Design & Architecture',
    description: 'Transforming spaces with innovative, sustainable design solutions in Kolkata',
    url: 'https://fsinfrastructure.com',
    siteName: 'F.S.Infrastructure',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'F.S.Infrastructure - Premium Interior Design',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F.S.Infrastructure - Premium Interior Design & Architecture',
    description: 'Transforming spaces with innovative, sustainable design solutions in Kolkata',
    images: ['/images/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0B1426" />
      </head>
      <body className={`${inter.className} bg-[#0B1426] text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}