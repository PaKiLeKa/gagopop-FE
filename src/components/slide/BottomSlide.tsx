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
        className={`absolute bottom-0 w-full bg-white transition-all duration-300 ease-in-out ${
          open ? 'h-[93%] overflow-auto pb-16 z-10' : 'h-28' //네비게이션보다 조금위로 하면 될 듯
        }`}
      >
        <button onClick={toggleSlide} className='flex justify-center items-center w-full'>
          <div className='mt-1 bg-gray-300 w-5 h-1 rounded-full'></div>
        </button>
        {/* 슬라이딩 패널 내용 */}
        <div>
          {content}
          {content}
          {content}
          {content}
          {content}
          {content}
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
}
