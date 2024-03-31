'use client';

import Script from 'next/script';

export default function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API);
  };

  return <Script src='https://developers.kakao.com/sdk/js/kakao.js' async onLoad={onLoad} />;
}
