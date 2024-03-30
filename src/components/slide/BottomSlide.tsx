'use client';

import { ReactNode, useState } from 'react';

export default function BottomSlide({ content }: { content: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleSlide = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* //슬라이딩 패널 */}
      <div
        className={`absolute bottom-0 w-full bg-white transition-all duration-300 ease-in-out shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.4)] ${
          open ? 'absolute h-[92%] pb-10 z-10' : 'h-28' //네비게이션보다 조금위로 하면 될 듯
        }`}
      >
        <button onClick={toggleSlide} className='flex justify-center items-center w-full'>
          <div className='mt-1 bg-gray-300 w-5 h-1 rounded-full'></div>
        </button>
        {/* 슬라이딩 패널 내용 */}
        <div className='overflow-auto h-[93%]'>{content}</div>
      </div>
    </div>
  );
}
