import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ADMIN_NAVIGATION, AdminLayout } from '@/modules/admin';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Production-ready admin panel UI',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 font-sans text-neutral-100">
        <AdminLayout navigation={ADMIN_NAVIGATION}>{props.children}</AdminLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
