'use client';

import Image from 'next/image';
import Heart from '../../../public/icons/heart.svg';
import EmptyHeart from '../../../public/icons/emptyheart.svg';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/store';
import Badge from '../badge/Badge';
import { PopupType, PopupTypewithTogo, PopupTypewithWish } from '@/types/types';
import { useRouter } from 'next/navigation';
import usePeriod from '@/hooks/usePeriod';
import { api, apiCred } from '@/api';
import { Suspense, useEffect, useState } from 'react';

export default function PopupCard({ info, period }: { info: PopupType; period: string[] }) {
  const [wishList, setWishList] = useState<PopupTypewithTogo[]>();
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const router = useRouter();

  const handleDestinationBtn = () => {
    if (destination.length < 5 && !destination.some((v) => v.id === info.id))
      setDestinationState([...destination, info]);
  };

  const { periodState, diffDay } = usePeriod(info);

  const handleWishButton = () => {
    apiCred
      .get(`/user/wishlist/add?pid=${info.id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleDeleteWishButton = () => {
    apiCred
      .get(`/user/wishlist/delete?pid=${info?.id}`)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    apiCred
      .get('/user/wishlist')
      .then((res) => setWishList(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Suspense>
      <div
        className={`flex h-[120px] p-3 border-b border-b-gray-100 ${
          period?.length !== 0 && !period?.includes(periodState) ? 'hidden' : ''
        }`}
      >
        <div className='w-[100px] h-[100px] relative rounded-md aspect-square overflow-hidden'>
          <Image
            onClick={() => {
              router.push(`/popup/${info?.id}`);
            }}
            src={info?.imageUrl}
            alt='설명'
            className='w-[100px] h-[100px]'
            fill
          />
          <div
            onClick={() => {
              wishList?.find((item) => item.popupStore && item.popupStore.id === info.id)
                ? handleDeleteWishButton()
                : handleWishButton();
            }}
            className='absolute top-1 left-1 cursor-pointer'
          >
            {wishList?.find((item) => item.popupStore && item.popupStore.id === info.id) ? (
              <Heart width='20' height='20' viewBox='4 0 40 40' />
            ) : (
              <EmptyHeart />
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between w-2/3 ml-2 '>
          <div className='w-full'>
            <div className='flex justify-between mb-2'>
              <p className='text-[10px] text-gray-400'>
                {info?.startDate.toString().substring(0, 10) +
                  ' ~ ' +
                  info?.endDate.toString().substring(0, 10)}
              </p>
              <Badge badgeState={periodState} diff={diffDay} />
            </div>
            <p
              onClick={() => {
                router.push(`/popup/${info?.id}`);
              }}
              className='font-bold -mt-2'
            >
              {info?.name}
            </p>
          </div>
          <div className='flex justify-between items-end'>
            <p className='text-[10px] text-gray-400'>{info?.address}</p>
            <button
              onClick={() => {
                handleDestinationBtn();
              }}
              className='flex justify-center items-center shrink-0 w-11 h-11 border border-gray-300 rounded-full '
            >
              <DestinationIcon />
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
