'use client';

import Image from 'next/image';
import Heart from '../../../public/icons/heart.svg';
import EmptyHeart from '../../../public/icons/emptyheart.svg';
import Togo from '../../../public/icons/togo.svg';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/search';
import Badge from '../badge/Badge';
import { PopupType } from '@/types/types';
import { useEffect, useState } from 'react';
import Test from '../../../public/images/dummy.png';
import { useRouter } from 'next/navigation';
export default function PopupCard({
  icon,
  info,
  period,
}: {
  icon: string;
  info: PopupType;
  period: string[];
}) {
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [periodState, setPeriodState] = useState<string>('');
  const [diffDay, setDiffDay] = useState<number>(0);
  const router = useRouter();

  const handleDestinationBtn = () => {
    setDestinationState([...destination, info]);
  };

  // 날짜 관련
  useEffect(() => {
    const today = new Date().getTime();
    const startDate = new Date(info?.startDate).getTime();
    const endDate = new Date(info?.endDate).getTime();
    
    if ((startDate <= today && today <= endDate) || (startDate <= today && startDate === endDate)) {
      setPeriodState('open');
      if (Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) < 8) {
        setPeriodState('endsoon');
        setDiffDay(Math.floor((endDate - today) / (1000 * 60 * 60 * 24)));
      }
    } else {
      if (Math.floor((today - endDate) / (1000 * 60 * 60 * 24)) > 0) {
        setPeriodState('end');
      } else {
        setPeriodState('opensoon');
        setDiffDay(Math.floor((startDate - today) / (1000 * 60 * 60 * 24)));
      }
    }
  }, []);

  return (
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
          src={info?.imageUrl ? info.imageUrl : Test}
          alt='설명'
          className='w-[100px] h-[100px]'
          fill
        />
        <div className='absolute top-1'>{icon === 'heart' ? <Heart /> : <EmptyHeart />}</div>
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
  );
}
