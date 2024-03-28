'use client';

import PopupCard from '@/components/card/PopupCard';
import Link from 'next/link';

export default function PopUpList() {
  const num = 5;

  return (
    <div className='h-[100vh]'>
      <div className='relative flex justify-center items-center w-full h-14 px-1 py-2 border border-b-black'>
        <Link
          href={'/'}
          className='absolute left-3 flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 hover:bg-gray-100'
        >
          <div className='text-2xl'>←</div>
        </Link>
        <span className='text-xl'>🔥 지금 핫한 팝업스토어</span>
      </div>
      <div className='flex text-sm m-2 -mb-2 text-gray-500'>
        <p className='font-bold text-black ml-1'>{num}개</p>의 팝업스토어가 있습니다.
      </div>
      <div className='h-full mt-4 pb-44 overflow-auto'>
        <PopupCard icon='heart' /> <PopupCard icon='heart' /> <PopupCard icon='heart' />
        <PopupCard icon='heart' /> <PopupCard icon='heart' /> <PopupCard icon='heart' />
        <PopupCard icon='heart' /> <PopupCard icon='heart' /> <PopupCard icon='heart' />
      </div>
    </div>
  );
}
