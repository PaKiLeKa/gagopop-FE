'use client';

import Image from 'next/image';
import SearchBar from '@/components/searchbar/SearchBar';
import DetailMap from '@/components/map/DetailMap';
import HeartIcon from '../../../../public/icons/heart.svg';
import EmptyHeartIcon from '../../../../public/icons/emptyheart.svg';
import TogoIcon from '../../../../public/icons/detail/togo.svg';
import ShareIcon from '../../../../public/icons/detail/share.svg';
import TimeIcon from '../../../../public/icons/detail/time.svg';
import AddressIcon from '../../../../public/icons/detail/address.svg';
import SNSIcon from '../../../../public/icons/detail/sns.svg';
import MapIcon from '../../../../public/icons/detail/map.svg';
import GrowIcon from '../../../../public/icons/detail/grow.svg';
import IntroIcon from '../../../../public/icons/detail/intro.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/search';
import Badge from '@/components/badge/Badge';
import { api } from '@/api';
import { useEffect, useState } from 'react';
import { PopupType, PopupTypewithWish } from '@/types/types';
import { usePathname } from 'next/navigation';

export default function PopUpDetail() {
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [popup, setPopup] = useState<PopupTypewithWish>();
  const pathname = usePathname();
  const handleDestinationBtn = () => {
    setDestinationState([...destination, popup?.popupStore]);
  };
  const searchParams = pathname.split('/')[2];

  useEffect(() => {
    api
      .get('/popup/find-all-with-wish')
      .then((res) =>
        res.data.find(
          (item: { popupStore: { id: number } }) => item.popupStore.id == parseInt(searchParams),
        ),
      )
      .then((res) => setPopup(res))
      .catch(() => {
        console.log('error');
      });
  }, []);
  
  return (
    <div className='h-full pb-[104px]'>
      <SearchBar searchBarStyle={'date'} />
      <div className='h-full overflow-auto'>
        <div className='relative aspect-square'>
          <Image
            src={popup?.popupStore.imageUrl}
            alt='팝업 스토어 이미지'
            fill
            className='brightness-75'
          />
          <div className='absolute'>
            <div className='flex flex-col justify-between w-[360px] aspect-square p-4'>
              <div className='flex flex-col gap-2'>
                <EmptyHeartIcon width='40' height='40' viewBox='0 0 20 20' />
                <TogoIcon />
                <ShareIcon />
              </div>
              <div className='flex justify-between items-end text-white'>
                <div>
                  <Badge badgeState='end' />
                  <p>{`${popup?.popupStore.startDate
                    .toString()
                    .substring(0, 10)} ~ ${popup?.popupStore.endDate
                    .toString()
                    .substring(0, 10)}`}</p>
                  <p className='text-2xl font-bold'>{popup?.popupStore.name}</p>
                </div>
                <GrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex gap-1'>
            <TimeIcon />
            <div className='text-sm'>
              <p>운영시간</p>
              <p className='text-gray-400 font-light'>{popup?.popupStore.operatingTime}</p>
            </div>
          </div>
          <div className='flex gap-1'>
            <AddressIcon />
            <div className='text-sm'>
              <p>주소</p>
              <p className='text-gray-400 font-light'>{popup?.popupStore.address}</p>
            </div>
          </div>
          <div className='flex gap-1'>
            <SNSIcon />
            <div className='text-sm'>
              <p>SNS</p>
              {popup?.popupStore.snsLink ? (
                <a href={popup.popupStore.snsLink} className='text-blue-400 font-light'>
                  링크로 이동
                </a>
              ) : (
                <p className='text-gray-400 font-light'>SNS링크가 없습니다.</p>
              )}
            </div>
          </div>
          <div className='flex gap-2'>
            <div>
              <IntroIcon />
            </div>
            <div className='text-sm'>
              <p>팝업스토어 소개</p>
              {popup?.popupStore.info ? (
                <p className='text-gray-400 font-light'>${popup.popupStore.info}</p>
              ) : (
                <p className='text-gray-400 font-light'>팝업 소개가 아직 작성되지 않았습니다.</p>
              )}
            </div>
          </div>
          <div>
            <div className='flex gap-1 mb-2'>
              <MapIcon />
              <p>지도</p>
            </div>
            <DetailMap lon={popup?.popupStore.longitude} lat={popup?.popupStore.latitude} />
          </div>
        </div>
      </div>

      <button
        onClick={handleDestinationBtn}
        className='flex justify-center items-center w-full h-12 bg-yellow-500'
      >
        목적지설정
      </button>
    </div>
  );
}
