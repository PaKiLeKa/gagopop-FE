import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './navigaition/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '가고팝',
  description: '팝업 정보 및 위치 경로 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex justify-center bg-gray-400'>
        <main className='relative w-96 h-screen bg-blue-300'>
          {children}
          <Navbar />
        </main>
      </body>
    </html>
  );
}
