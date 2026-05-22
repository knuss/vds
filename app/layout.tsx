import type { Metadata } from 'next';
import { Bebas_Neue, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import UtilityBar from '@/components/layout/UtilityBar';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

const displayFont = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
});

const bodyFont = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'The Car Garage AU',
  description: 'Quality used cars in Sydney with drive-away pricing and finance options.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <UtilityBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
