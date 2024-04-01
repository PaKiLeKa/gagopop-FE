'use client';

import Script from 'next/script';
import { Suspense, useEffect, useState } from 'react';
import CurrentPositionIcon from '../../../public/icons/currentPosition.svg';
import { PopupTypewithWish } from '@/types/types';
import { api, apiCred } from '@/api';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/store';
import DirectionSlide from '../slide/DirectionSlide';

export default function Map() {
  const [src, setSrc] = useState<string>();
  const [currentMap, setCurrentMap] = useState<currentMapType>();
  const [currentXY, setCurrentXY] = useState<number[]>([]);
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [destinationXY, setDestinationXY] = useState<string>('');
  const [clickedPosition, setClickedPosition] = useState<string[]>();
  const [result, setResult] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const APPKEY = process.env.NEXT_PUBLIC_TMAP_API;
  const [popupList, setPopupList] = useState<PopupTypewithWish[]>();

  interface currentMapType {
    setCenter: (arg0: any) => void;
    setZoom: (arg0: number) => void;
  }
  // 경로 저장
  useEffect(() => {
    const destinationLatLng: string[] = [];
    destination?.map((v) => {
      destinationLatLng.push(v.longitude + ',' + v.latitude);
    });

    setDestinationXY(clickedPosition?.join(',') + '_' + destinationLatLng.join('_'));

    console.log(destinationLatLng.join(','));
  }, [destination, clickedPosition]);

  // 지도 불러오기
  const onLoadMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const mapInstance = new window.Tmapv2.Map('map_div', {
          center: new window.Tmapv2.LatLng(lat, lon),
          width: '100%',
          height: '100vh',
          zoom: 15,
          zoomControl: false,
          scrollwheel: true,
        });

        mapInstance.addListener('click', onClick); //map 클릭 이벤트를 등록
        let clickMarker: any[] = [];
        function onClick(e: { latLng: any }) {
          // 클릭한 위치에 새로 마커를 찍기 위해 이전에 있던 마커들을 제거
          function removeMarkers() {
            for (let i = 0; i < clickMarker.length; i++) {
              clickMarker[i].setMap(null);
            }
            clickMarker = [];
          }

          removeMarkers();

          let lonlat = e.latLng;
          //Marker 객체 생성.
          let markerClick = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(lonlat.lat(), lonlat.lng()), //Marker의 중심좌표 설정.
            map: mapInstance, //Marker가 표시될 Map 설정.
          });

          clickMarker.push(markerClick);

          const clickMarkerImage = 'https://kr.object.ncloudstorage.com/gagopop/pin_start.png';
          markerClick.setIcon(clickMarkerImage);

          setClickedPosition([lonlat.lng(), lonlat.lat()]);
        }

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(lat, lon),
          map: mapInstance,
        });

        const customMarkerImageUrl =
          'https://kr.object.ncloudstorage.com/gagopop/pin_destination.png';
        marker.setIcon(customMarkerImageUrl);

        mapInstance.setCenter(new window.Tmapv2.LatLng(lat, lon));
        mapInstance.setZoom(15);
        setCurrentMap(mapInstance);
        setCurrentXY([lat, lon]);
      });
    }
  };

  // 현재 위치 버튼
  const handleCurrentButton = () => {
    currentMap?.setCenter(new window.Tmapv2.LatLng(currentXY[0], currentXY[1]));
    currentMap?.setZoom(15);
  };

  // 스크립트 콜
  // useEffect(() => {
  //   if (window.Tmapv2) {
  //     setSrc(window.Tmapv2._getScriptLocation());
  //   }

  //   const script = document.createElement('script');
  //   script.src = `${src}tmapjs2.min.js?version=20231206`;
  //   script.async = true;
  //   script.onload = onLoadMap;

  //   //이전 스크립트 제거
  //   const prevScript = document.querySelector('script[src^="' + src + '"]');
  //   if (prevScript) {
  //     document.body.removeChild(prevScript);
  //   }

  //   document.body.appendChild(script);
  // }, [src]);

  // useEffect(() => {
  //   if (window.Tmapv2) {
  //     const script = document.createElement('script');
  //     script.src = `${window.Tmapv2._getScriptLocation()}tmapjs2.min.js?version=20231206`;
  //     script.async = false;
  //     script.onload = onLoadMap;

  //     //이전 스크립트 제거
  //     const prevScript = document.querySelector(
  //       'script[src^="' + window.Tmapv2._getScriptLocation() + '"]',
  //     );
  //     if (prevScript) {
  //       document.body.removeChild(prevScript);
  //     }

  //     document.body.appendChild(script);
  //   }
  // }, []);
  useEffect(() => {
    onLoadMap();
  }, []);
  // 팝업 리스트 불러오기
  useEffect(() => {
    apiCred
      .get('/popup/find-all')
      .then((res) => {
        setPopupList(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  // 팝업 마커 그려주기
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

          if (popup.inWishlist) {
            const customMarkerImageUrl = 'https://kr.object.ncloudstorage.com/gagopop/pin_wish.png';
            marker.setIcon(customMarkerImageUrl);
          } else {
            const customMarkerImageUrl =
              'https://kr.object.ncloudstorage.com/gagopop/pin_popup.png';
            marker.setIcon(customMarkerImageUrl);
          }
        });
      }
    };
    // 팝업 리스트나 지도 객체가 변경될 때마다 실행
    handlePopupMarkers();
  }, [popupList, currentMap]);

  // 경로 찾기 버튼
  const handleFindPath = () => {
    const startLat = clickedPosition && clickedPosition[1];
    const startLng = clickedPosition && clickedPosition[0];
    const endLat = Object.values(destination)[Object.values(destination).length - 1].latitude;
    const endLng = Object.values(destination)[Object.values(destination).length - 1].longitude;
    let drawInfoArr = [];
    let resultdrawArr: any[] = [];
    let resultMarker: any[] = [];
    api
      .get(`/popup/find-route?latitude=${startLat}&longitude=${startLng}&pid=3,4,5`)
      .then((res) => res.data)
      .then((res) => {
        const handleShowPath = async () => {
          // 기존 그려진 라인 & 마커 초기화
          if (resultdrawArr.length > 0) {
            for (let i = 0; i < resultdrawArr.length; i++) {
              resultdrawArr[i].setMap(null);
            }
            resultdrawArr = [];
          }
          if (resultMarker.length > 0) {
            for (let i = 0; i < resultMarker.length; i++) {
              resultMarker[i].setMap(null);
            }
            resultMarker = [];
          }
          drawInfoArr = [];

          try {
            const response = await axios.post(
              'https://apis.openapi.sk.com/tmap/routes/pedestrian',
              {
                startX: startLng,
                startY: startLat,
                endX: endLng,
                endY: endLat,
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

            // 결과 저장
            setResult([
              (resultData[0].properties.totalDistance / 1000).toFixed(1) + 'km',
              (resultData[0].properties.totalTime / 60).toFixed(0),
            ]);

            for (const result of resultData) {
              const geometry = result.geometry;
              let properties = result.properties;
              let polyline;

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
                let pType = '';
                let size;

                if (properties.pointType == 'SP') {
                  //출발지 마커
                  markerImg = 'https://kr.object.ncloudstorage.com/gagopop/pin_start.png';
                  pType = 'SP';
                  size = new window.Tmapv2.Size(24, 38);
                } else if (properties.pointType == 'EP') {
                  //도착지 마커
                  markerImg = 'https://kr.object.ncloudstorage.com/gagopop/pin_destination.png';
                  pType = 'EP';
                  size = new window.Tmapv2.Size(24, 38);
                } else if (
                  properties.pointType == 'PP1' ||
                  properties.pointType == 'PP2' ||
                  properties.pointType == 'PP3' ||
                  properties.pointType == 'PP4' ||
                  properties.pointType == 'PP5' ||
                  properties.pointType == 'PP6'
                ) {
                  //각 목적지 마커
                  markerImg = 'https://kr.object.ncloudstorage.com/gagopop/pin_destination.png';
                  pType = 'PP';
                  size = new window.Tmapv2.Size(24, 38);
                } else {
                  // else
                  markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
                  size = new window.Tmapv2.Size(1, 1);
                }

                const latlon = new window.Tmapv2.Point(
                  geometry.coordinates[0],
                  geometry.coordinates[1],
                );
                const convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                let routeInfoObj = {
                  markerImage: markerImg,
                  lng: convertPoint._lng,
                  lat: convertPoint._lat,
                  pointType: pType,
                };

                const marker_p = new window.Tmapv2.Marker({
                  position: new window.Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
                  icon: routeInfoObj.markerImage,
                  iconSize: size,
                  map: currentMap,
                });
                resultMarker.push(marker_p);
              }
            }

            drawLine(drawInfoArr); // drawLine 함수 호출
          } catch (error) {
            console.error('Error:', error);
          }
        };
        handleShowPath();

        const drawLine = (arrPoint: any[]) => {
          let polyline;
          polyline = new window.Tmapv2.Polyline({
            path: arrPoint,
            strokeColor: '#FCC32E',
            strokeWeight: 6,
            map: currentMap,
          });

          resultdrawArr.push(polyline);
          currentMap?.setCenter(new window.Tmapv2.LatLng(startLat, startLng));
          currentMap?.setZoom(15);
        };
      });
    setModal(true);
  };

  return (
    <>
      {/* <Script
        type='text/javascript'
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appkey=${APPKEY}`}
        strategy='beforeInteractive'
      /> */}
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
        {destination.length > 0 && (
          <button
            className='absolute -top-12 right-6 py-3 px-10 z-10 font-light'
            onClick={() => {
              clickedPosition ? handleFindPath() : alert('출발지를 선택해주세요!');
            }}
          >
            경로탐색
          </button>
        )}
      </div>
      <div className={`absolute bottom-16 left-0 w-full z-50 ${modal ? 'visible' : 'hidden'}`}>
        <DirectionSlide result={result} destination={destination} />
        <div
          onClick={() => {
            setModal(false);
          }}
          className='absolute right-4 top-4 text-sm cursor-pointer z-20'
        >
          닫기
        </div>
      </div>
    </>
  );
}
