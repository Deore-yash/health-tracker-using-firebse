import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Belleza, PT_Sans } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

const belleza = Belleza({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-belleza',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Health Tracker',
  description: 'Your personal health monitoring companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ptSans.variable} ${belleza.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
