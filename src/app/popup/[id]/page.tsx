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
import kakaoIcon from '../../../../public/icons/share/kakaoIcon.png';
import LinkShareIcon from '../../../../public/icons/share/linkshare.png';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/store';
import Badge from '@/components/badge/Badge';
import { api, apiCred } from '@/api';
import { useEffect, useState } from 'react';
import { PopupType, PopupTypewithWish } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import usePeriod from '@/hooks/usePeriod';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';

export default function PopUpDetail() {
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [popup, setPopup] = useState<PopupTypewithWish>();
  const pathname = usePathname();
  const router = useRouter();
  const { periodState, diffDay } = usePeriod(popup?.popupStore!);
  const [enlarge, setEnlarge] = useState<boolean>(false);
  const [wish, setWish] = useState<boolean>();
  const searchParams = pathname.split('/')[2];

  const handleDestinationBtn = () => {
    const filteredPopups = popup ? [popup.popupStore] : [];

    setDestinationState([...destination, ...filteredPopups]);
  };

  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    alert('링크가 복사되었습니다.');
  };

  const handleShareToKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    });
  };

  const handdleAddWishButton = () => {
    apiCred
      .get(`/user/wishlist/add?pid=${popup?.popupStore.id}`)
      .then((res) => {
        console.log(res);
        setWish(!wish);
      })
      .catch((error) => console.log(error));
  };

  const handdleDeleteWishButton = () => {
    apiCred
      .get(`/user/wishlist/delete?pid=${popup?.popupStore.id}`)
      .then((res) => {
        console.log(res);
        setWish(!wish);
      })
      .catch((error) => console.log(error));
  };

  const handleEnlargeButton = () => {
    setEnlarge(!enlarge);
  };

  useEffect(() => {
    apiCred
      .get('/popup/find-all')
      .then((res) =>
        res.data.find(
          (item: { popupStore: { id: number } }) => item.popupStore.id == parseInt(searchParams),
        ),
      )
      .then((res) => {
        setPopup(res);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  useEffect(() => {
    if (popup) {
      setWish(popup?.inWishlist);
    }
  }, [popup]);

  return (
    <div className='h-full pb-[104px]'>
      <SearchBar searchBarStyle={'date'} />
      <div className='h-full overflow-auto'>
        <div className='relative aspect-square'>
          <Image
            src={popup ? popup?.popupStore?.imageUrl : ''}
            alt='팝업 스토어 이미지'
            fill
            objectFit={enlarge ? 'contain' : 'none'}
            className='brightness-75 bg-slate-100'
          />
          <div className='absolute'>
            <div className='flex flex-col justify-between w-[360px] aspect-square p-4'>
              <div className='flex flex-col gap-2'>
                {wish ? (
                  <button className='w-10 h-10'>
                    <HeartIcon
                      onClick={() => {
                        handdleDeleteWishButton();
                      }}
                      width='40'
                      height='40'
                      viewBox='4 5 40 30'
                    />
                    /
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handdleAddWishButton();
                    }}
                    className='w-10 h-10'
                  >
                    <EmptyHeartIcon width='40' height='40' viewBox='0 0 20 20' />
                  </button>
                )}
                <TogoIcon />
                <ShareIcon />
                <Popover>
                  <PopoverTrigger className='relative bottom-12  w-10 h-10 bg-transparent hover:brightness-50'></PopoverTrigger>
                  <PopoverContent>
                    <div className='relative flex justify-center items-center gap-2 bg-[rgba(255,255,255,0.5)]  left-12 px-3 py-1 rounded-2xl'>
                      <button
                        onClick={() => {
                          handleShareToKakao();
                        }}
                        className='w-8 h-8 rounded-full'
                      >
                        <Image src={kakaoIcon} alt='카카오 공유하기' />
                      </button>
                      <button
                        onClick={() => {
                          copyURL();
                        }}
                        className='flex justify-center items-center w-8 h-8 bg-white border-b rounded-full p-1'
                      >
                        <Image src={LinkShareIcon} alt='링크 복사하기' width={20} height={20} />
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex justify-between items-end text-white'>
                <div>
                  <Badge badgeState={periodState} diff={diffDay} />
                  <p>{`${popup?.popupStore.startDate
                    .toString()
                    .substring(0, 10)} ~ ${popup?.popupStore.endDate
                    .toString()
                    .substring(0, 10)}`}</p>
                  <p className='text-2xl font-bold'>{popup?.popupStore.name}</p>
                </div>
                <button
                  className='bg-500-blue w-10 h-10 bg-transparent hover:brightness-50'
                  onClick={() => {
                    handleEnlargeButton();
                  }}
                >
                  <GrowIcon />
                </button>
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
            <DetailMap
              lon={popup ? popup?.popupStore.longitude : 0}
              lat={popup ? popup?.popupStore.latitude : 0}
            />
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
