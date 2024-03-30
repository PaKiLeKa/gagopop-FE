'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import CurrentPositionIcon from '../../../public/icons/currentPosition.svg';
import Splash from '../splash/Splash';
import Testicon from '../../../public/icons/marker/startpin.svg';
import { PopupTypewithWish } from '@/types/types';
import { api } from '@/api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/search';

export default function Map() {
  const [src, setSrc] = useState<string>();
  const [currentMap, setCurrentMap] = useState<currentMapType>();
  const [currentXY, setCurrentXY] = useState<number[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [destinationXY, setDeestinationXY] = useState<string>('');
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;

  const [popupList, setPopupList] = useState<PopupTypewithWish[]>();

  useEffect(() => {
    const destinationLatLng: string[] = [];
    destination?.map((v) => {
      destinationLatLng.push(v.longitude + ',' + v.latitude);
    });
    setDeestinationXY(destinationLatLng.join('_'));
    console.log(destinationLatLng.join(','));
  }, [destination]);

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
          height: '83vh',
          zoom: 15,
          zoomControl: false,
          scrollwheel: true,
        });

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(lat, lon),
          map: mapInstance,
        });
        var customMarkerImageUrl = 'https://via.placeholder.com/50';
        marker.setIcon(customMarkerImageUrl);
        const InfoWindow = new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(lat, lon),
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

  useEffect(() => {
    api
      .get('/popup/find-all-with-wish')
      .then((res) => {
        setPopupList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  useEffect(() => {
    // 팝업 리스트가 있고 지도 객체가 로드되었을 때 실행되는 콜백 함수
    const handlePopupMarkers = () => {
      if (popupList && currentMap) {
        popupList.forEach((popup, index) => {
          const { latitude, longitude, name } = popup.popupStore; // 팝업 객체에서 위도, 경도, 이름 추출

          // 마커 생성
          const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(latitude, longitude),
            map: currentMap,
          });

          // 마커에 번호 붙이기
          marker.index = index;

          // 마커 클릭 시 정보 창 열기
          marker.addListener('click', () => {
            // 정보 창 내용 설정
            const infoWindowContent = `
              <div>
                <h3>${name}</h3>
              </div>
            `;

            // 정보 창 생성
            const infoWindow = new window.Tmapv2.InfoWindow({
              position: new window.Tmapv2.LatLng(latitude, longitude),
              type: 2,
              content: infoWindowContent,
              map: currentMap,
            });

            // 정보 창에 번호 붙이기
            infoWindow.index = index;
          });
        });
      }
    };

    // 팝업 리스트나 지도 객체가 변경될 때마다 실행
    handlePopupMarkers();
  }, [popupList, currentMap]);

  const handleFindPath = () => {
    const startLat = currentXY[0];
    const endLng = currentXY[1];
    api
      .get(`/popup/find-route?latitude=${startLat}&longitude=${endLng}&pid=3,4,5`)
      .then((res) => res.data)
      .then((res) => {
        const marker_s = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(37.564991, 126.983937),
          icon: 'https://via.placeholder.com/50',
          iconSize: new window.Tmapv2.Size(24, 38),
          map: currentMap,
        });
        const marker_e = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(37.566158, 126.98894),
          icon: 'https://via.placeholder.com/50',
          iconSize: new window.Tmapv2.Size(24, 38),
          map: currentMap,
        });

        const handleShowPath = async () => {
          const startLat = currentXY[0];
          const endLng = currentXY[1];
          try {
            const response = await axios.post(
              'https://apis.openapi.sk.com/tmap/routes/pedestrian',
              {
                startX: '126.983937',
                startY: '37.564991',
                endX: '126.988940',
                endY: '37.566158',
                reqCoordType: 'WGS84GEO',
                resCoordType: 'EPSG3857',
                startName: '출발지',
                endName: '도착지',
                passList: destinationXY,
              },
              {
                headers: {
                  appKey: APPKEY,
                  'Content-Type': 'application/json',
                },
              },
            );

            const resultData = response.data.features;

            // 결과 출력
            const tDistance =
              '총 거리: ' + (resultData[0].properties.totalDistance / 1000).toFixed(1) + 'km, ';
            const tTime = '총 시간: ' + (resultData[0].properties.totalTime / 60).toFixed(0) + '분';

            console.log(tDistance + tTime);

            // 기존 그려진 라인 & 마커 초기화
            // if (resultdrawArr.length > 0) {
            // for (const marker of resultdrawArr) {
            // marker.setMap(null);
            // }
            const resultdrawArr = [];
            // }

            const drawInfoArr = [];

            for (const result of resultData) {
              const geometry = result.geometry;
              const properties = result.properties;

              if (geometry.type === 'LineString') {
                for (const coord of geometry.coordinates) {
                  const latlng = new window.Tmapv2.Point(coord[0], coord[1]);
                  const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlng,
                  );
                  const convertChange = new window.Tmapv2.LatLng(
                    convertPoint._lat,
                    convertPoint._lng,
                  );
                  drawInfoArr.push(convertChange);
                }
              } else {
                let markerImg = '';
                let size;
                var pType = '';

                if (properties.pointType === 'S') {
                  markerImg = 'https://via.placeholder.com/50';
                  size = new window.Tmapv2.Size(24, 38);
                } else if (properties.pointType === 'E') {
                  markerImg = 'https://via.placeholder.com/50';
                  size = new window.Tmapv2.Size(24, 38);
                  pType = 'E';
                } else {
                  markerImg = 'https://via.placeholder.com/50';
                  size = new window.Tmapv2.Size(8, 8);
                  pType = 'P';
                }

                const latlon = new window.Tmapv2.Point(
                  geometry.coordinates[0],
                  geometry.coordinates[1],
                );
                const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                const marker = new window.Tmapv2.Marker({
                  position: new window.Tmapv2.LatLng(convertPoint._lat, convertPoint._lng),
                  icon: markerImg,
                  iconSize: size,
                  map: currentMap,
                });

                resultdrawArr.push(marker);
              }
            }

            drawLine(drawInfoArr); // drawLine 함수 호출
          } catch (error) {
            console.error('Error:', error);
          }
        };
        handleShowPath();
        const resultdrawArr = [];

        const drawLine = (arrPoint: any[]) => {
          let polyline;

          polyline = new window.Tmapv2.Polyline({
            path: arrPoint,
            strokeColor: '#FCC32E',
            strokeWeight: 6,
            map: currentMap,
          });

          resultdrawArr.push(polyline);
        };
      });
  };

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
          <button
            onClick={() => {
              handleFindPath();
            }}
          >
            경로탐색
          </button>
        </div>
      ) : (
        <Splash />
      )}
    </>
  );
}
