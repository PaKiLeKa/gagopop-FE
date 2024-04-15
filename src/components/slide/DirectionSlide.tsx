'use client';

import { ReactNode, useState } from 'react';
import MarkIcon from '../../../public/icons/marker/destination_s.svg';
import { PopupType } from '@/types/types';

export default function DirectionSlide({
  result,
  destination,
}: {
  result: string[];
  destination: PopupType[];
}) {
  const [open, setOpen] = useState(false);

  const toggleSlide = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* //슬라이딩 패널 */}
      <div
        className={`w-full transition-all duration-300 ease-in-out bg-white shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.4)] ${
          open ? 'h-auto z-20' : 'h-28 z-20' //네비게이션보다 조금위로 하면 될 듯
        }`}
      >
        <button onClick={toggleSlide} className='flex justify-center items-center w-full'>
          <div className='mt-1 bg-gray-300 w-5 h-1 rounded-full'></div>
        </button>
        {/* 슬라이딩 패널 내용 */}
        <div className='overflow-auto p-4 h-[93%]'>
          <div className='flex gap-2 mb-2'>
            <div className='bg-myellow rounded-full px-2 text-[10px]'>추천</div>
            <span className='text-xs'>도보</span>
          </div>
          <div className='flex gap-1 items-center'>
            <span className='text-2xl'>{result && result[1]}</span>
            <span>분</span>
          </div>
          <div className='mb-2 text-sm'>{result && result[0]}</div>
          {destination?.map((popup) => (
            <div key={popup.id} className='flex justify-between items-center py-3 border-t'>
              <div className='flex gap-3'>
                <MarkIcon />
                <div className='text-base'>{popup.name}</div>
              </div>
              <div className=' text-sm'>000m</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
