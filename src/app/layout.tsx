import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AdminShell } from '@/modules/admin';
import '@/styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Production-ready admin panel UI',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-neutral-950 text-neutral-100">
        <AdminShell>{props.children}</AdminShell>
      </body>
    </html>
  );
}
