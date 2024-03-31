'use client';

import Image from 'next/image';
import Togo from '../../../public/icons/togo.svg';
import EmptyTogo from '../../../public/icons/emptytogo.svg';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/search';
import Badge from '../badge/Badge';
import { PopupType, PopupTypewithTogo } from '@/types/types';
import Test from '../../../public/images/dummy.png';
import { useRouter } from 'next/navigation';
import usePeriod from '@/hooks/usePeriod';
import { api, apiCred } from '@/api';

export default function PopupCard({ info, period }: { info: PopupTypewithTogo; period: string[] }) {
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const router = useRouter();
  const handleDestinationBtn = () => {
    setDestinationState([...destination, info.popupStore]);
  };
  const { periodState, diffDay } = usePeriod(info?.popupStore);

  const handleTogoButton = () => {};
  const handleDeleteTogoButton = () => {};

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
            info.inTogo ? handleDeleteTogoButton() : handleTogoButton();
          }}
          className='absolute top-1 left-1 cursor-pointer'
        >
          {info?.inTogo ? <Togo width='20' height='20' viewBox='4 0 40 40' /> : <EmptyTogo />}
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