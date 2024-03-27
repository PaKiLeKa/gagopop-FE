'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import CurrentPositionIcon from '../../../public/icons/currentPosition.svg';

export default function Map() {
  const [src, setSrc] = useState<string>();
  const [currentMap, setCurrentMap] = useState<currentMapType>();
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

  interface currentMapType {
    setCenter: (arg0: any) => void;
    setZoom: (arg0: number) => void;
  }

  const onLoadMap = () => {
    const mapInstance = new window.Tmapv2.Map('map_div', {
      center: new window.Tmapv2.LatLng(37.56701114710962, 126.9973611831669),
      width: '100%',
      height: '90vh',
      zoom: 15,
      zoomControl: false,
      scrollwheel: true,
    });
    setCurrentMap(mapInstance);
    currentPosition(mapInstance);
  };

  const currentPosition = (map: currentMapType) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        //팝업 생성
        const content =
          "<div style='position: relative;'>" +
          "<div style='font-size: 12px; line-height: 15px;'>" +
          '현재위치' +
          '</div>' +
          '</div>';

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(lat, lon),
          map: map,
        });

        const InfoWindow = new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(lat, lon),
          content: content,
          type: 2,
          map: map,
        });

        map.setCenter(new window.Tmapv2.LatLng(lat, lon));
        map.setZoom(15);
      });
    }
  };

  useEffect(() => {
    if (window.Tmapv2) {
      setSrc(window.Tmapv2._getScriptLocation());
    }
  }, [setSrc]);

  useEffect(() => {
    if (src) {
      const script = document.createElement('script');
      script.src = `${src}tmapjs2.min.js?version=20231206`;
      script.async = true;
      script.onload = onLoadMap;

      document.body.appendChild(script);

      // return () => {
      //   // 페이지 이동 시 지도 인스턴스 정리
      //   if (mapInstance) {
      //     mapInstance.destroy();
      //   }
      // };
    }
  }, [src]);

  return (
    <>
      {/* <script
        type='text/javascript'
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`}
      /> */}
      <Script
        type='text/javascript'
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`}
        strategy='beforeInteractive'
      />
      {src && <Script src={`${src}tmapjs2.min.js?version=20231206`} />}
      <div id='map_div' className='relative'>
        <button
          onClick={() => {
            currentMap ? currentPosition(currentMap) : null;
          }}
          className='absolute top-2 left-2 z-10'
        >
          <CurrentPositionIcon />
          <p className='text-xs'>내위치</p>
        </button>
      </div>
    </>
  );
}
