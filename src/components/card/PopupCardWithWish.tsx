'use client';

import Image from 'next/image';
import Heart from '../../../public/icons/heart.svg';
import EmptyHeart from '../../../public/icons/emptyheart.svg';
import Togo from '../../../public/icons/togo.svg';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/store';
import Badge from '../badge/Badge';
import { PopupType, PopupTypewithWish } from '@/types/types';
import Test from '../../../public/images/dummy.png';
import { useRouter } from 'next/navigation';
import usePeriod from '@/hooks/usePeriod';
import { api, apiCred } from '@/api';
import { useEffect, useState } from 'react';

export default function PopupCard({ info, period }: { info: PopupTypewithWish; period: string[] }) {
  const [wish, setWish] = useState<boolean>(info.inWishlist);
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const router = useRouter();
  
  const handleDestinationBtn = () => {
    if (destination.length < 5 && !destination.some((v) => v.id === info.popupStore.id))
      setDestinationState([...destination, info.popupStore]);
  };

  const { periodState, diffDay } = usePeriod(info?.popupStore);

  const handleWishButton = () => {
    apiCred
      .get(`/user/wishlist/add?pid=${info.popupStore.id}`)
      .then((res) => {
        setWish(!wish);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteWishButton = () => {
    apiCred
      .get(`/user/wishlist/delete?pid=${info?.popupStore.id}`)
      .then((res) => {
        setWish(!wish);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (info) {
      setWish(info?.inWishlist);
    }
  }, [info]);

  return (
    <div
      className={`flex h-[120px] p-3 border-b border-b-gray-100 ${
        period?.length !== 0 && !period?.includes(periodState) ? 'hidden' : ''
      }`}
    >
      <div className='w-[100px] h-[100px] relative rounded-md aspect-square overflow-hidden'>
        <Image
          onClick={() => {
            router.push(`/popup/${info?.popupStore.id}`);
          }}
          src={info?.popupStore?.imageUrl ? info.popupStore?.imageUrl : Test}
          alt='설명'
          className='w-[100px] h-[100px]'
          fill
        />
        <div
          onClick={() => {
            wish ? handleDeleteWishButton() : handleWishButton();
          }}
          className='absolute top-1 left-1 cursor-pointer'
        >
          {wish ? <Heart width='20' height='20' viewBox='4 0 40 40' /> : <EmptyHeart />}
        </div>
      </div>
      <div className='flex flex-col justify-between w-2/3 ml-2 '>
        <div className='w-full'>
          <div className='flex justify-between mb-2'>
            <p className='text-[10px] text-gray-400'>
              {info?.popupStore?.startDate.toString().substring(0, 10) +
                ' ~ ' +
                info?.popupStore?.endDate.toString().substring(0, 10)}
            </p>
            <Badge badgeState={periodState} diff={diffDay} />
          </div>
          <p
            onClick={() => {
              router.push(`/popup/${info?.popupStore.id}`);
            }}
            className='font-bold -mt-2'
          >
            {info?.popupStore?.name}
          </p>
        </div>
        <div className='flex justify-between items-end'>
          <p className='text-[10px] text-gray-400'>{info?.popupStore?.address}</p>
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
  );
}
