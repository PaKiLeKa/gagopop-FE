'use client';

import { useEffect, useState } from 'react';

export default function DetailMap({ lon, lat }: { lon: number; lat: number }) {
  const [currentMap, setCurrentMap] = useState();

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
    setCurrentMap(mapInstance);
  };

  useEffect(() => {
    if (lon && lat) onLoadMap(lat, lon);
  }, [lat, lon]);

  return (
    <>
      <div id='map_div' className='relative'></div>
    </>
  );
}
