'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function DetailMap({ lon, lat }: { lon: number; lat: number }) {
  const [src, setSrc] = useState<string>();
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;
  const testlat = lat;
  const testlon = lon;

  const onLoadMap = (lat: number, lon: number) => {
    const mapInstance = new window.Tmapv2.Map('map_div', {
      center: new window.Tmapv2.LatLng(lat, lon),
      width: '100%',
      height: '25vh',
      zoom: 18,
      zoomControl: false,
      scrollwheel: true,
    });

    const marker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(lat, lon),
      map: mapInstance,
    });

    mapInstance.setCenter(new window.Tmapv2.LatLng(lat, lon));
  };

  // 1차 스크립트
  useEffect(() => {
    if (window.Tmapv2) {
      setSrc(window.Tmapv2._getScriptLocation());
    }
  }, [src]);

  // 2차 스크립트
  useEffect(() => {
    if (src) {
      const script = document.createElement('script');
      script.src = `${src}tmapjs2.min.js?version=20231206`;
      script.async = true;
      script.onload = () => {
        onLoadMap(testlat, testlon);
      };

      //이전 스크립트 제거
      const prevScript = document.querySelector('script[src^="' + src + '"]');
      if (prevScript) {
        document.body.removeChild(prevScript);
      }

      document.body.appendChild(script);
    }
  }, [src]);

  return (
    <>
      <Script
        type='text/javascript'
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`}
        strategy='beforeInteractive'
      />
      {src && <Script src={`${src}tmapjs2.min.js?version=20231206`} />}
      <div id='map_div' className='relative'></div>
    </>
  );
}
