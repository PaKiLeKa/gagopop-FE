/* eslint-disable @next/next/no-sync-scripts */
import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/navigaition/Navbar';
import RecoilRootWrap from '@/util/RecoilRootWrap';
import Script from 'next/script';
import KakaoScript from '@/script/KakaoScript';

export const metadata: Metadata = {
  title: '가고팝',
  description: '팝업 정보 및 위치 경로 서비스',
  icons: {
    icon: '/gagopop.ico',
  },
};

declare global {
  interface Window {
    Tmapv2: any;
    Kakao: any;
  }
}
const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <script
          type='text/javascript'
          src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`}
        ></script>
      </head>
      <body>
        <RecoilRootWrap>
          {children}
          <Navbar />
        </RecoilRootWrap>
      </body>
      <KakaoScript />
    </html>
  );
}
