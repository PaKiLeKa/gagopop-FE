import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/navigaition/Navbar';

export const metadata: Metadata = {
  title: '가고팝',
  description: '팝업 정보 및 위치 경로 서비스',
};

declare global {
  interface Window {
    Tmapv2: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
