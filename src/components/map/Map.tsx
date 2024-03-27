'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import CurrentPositionIcon from '../../../public/icons/currentPosition.svg';

export default function Map() {
  const [src, setSrc] = useState<string>();
  const [currentMap, setCurrentMap] = useState<currentMapType>();
  const [currentXY, setCurrentXY] = useState<number[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

  interface currentMapType {
    setCenter: (arg0: any) => void;
    setZoom: (arg0: number) => void;
  }

  const onLoadMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const mapInstance = new window.Tmapv2.Map('map_div', {
          center: new window.Tmapv2.LatLng(lat, lon),
          width: '100%',
          height: '90vh',
          zoom: 15,
          zoomControl: false,
          scrollwheel: true,
        });

        //팝업 생성
        const content =
          "<div style='position: relative;'>" +
          "<div style='font-size: 12px;'>" +
          '내위치' +
          '</div>' +
          '</div>';

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(lat, lon),
          map: mapInstance,
        });

        const InfoWindow = new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(lat, lon),
          content: content,
          type: 2,
          map: mapInstance,
        });

        mapInstance.setCenter(new window.Tmapv2.LatLng(lat, lon));
        mapInstance.setZoom(15);
        setCurrentMap(mapInstance);
        setCurrentXY([lat, lon]);
      });
    }
    setLoading(false);
  };

  const handleCurrentButton = () => {
    currentMap?.setCenter(new window.Tmapv2.LatLng(currentXY[0], currentXY[1]));
    currentMap?.setZoom(15);
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
      script.onload = onLoadMap;

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
      {!loading ? (
        <div id='map_div' className='relative'>
          <button
            onClick={() => {
              handleCurrentButton();
            }}
            className='absolute top-2 left-2 z-10'
          >
            <div className='hover:bg-gray-300 rounded-full'>
              <CurrentPositionIcon />
            </div>
            <p className='text-xs'>내위치</p>
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
