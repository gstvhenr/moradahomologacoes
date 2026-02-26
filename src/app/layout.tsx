import type { Metadata } from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'gerenciador-de-homologacao',
  description: 'Sistema ERP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
