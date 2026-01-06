import type { Metadata } from 'next';
import { Jua, Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { CartProvider } from '@/contexts/RentalCartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { RentalReturnProvider } from '@/contexts/RentalReturnContext';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const notoSans = Noto_Sans_JP({
  weight: ['400', '700'],
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const jua = Jua({
  weight: '400',
  variable: '--font-jua',
  subsets: ['latin'],
});

const inter = Inter({
  weight: '400',
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Azzet Flax',
  description: 'レンタルサービスを提供します',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${jua.variable} ${inter.variable} wrapper`}>
        <AuthProvider>
          <CartProvider>
            <RentalReturnProvider>
              <BreadcrumbProvider>
                <Header />
                <Breadcrumbs />
                <main className="main">{children}</main>
              </BreadcrumbProvider>
            </RentalReturnProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
