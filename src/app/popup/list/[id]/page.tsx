'use client';

import { api } from '@/api';
import PopupCard from '@/components/card/PopupCard';
import { PopupType } from '@/types/types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PopUpList() {
  const [list, setList] = useState<PopupList | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  type PopupList = [string, PopupType[]];

  useEffect(() => {
    api
      .get('/popup/info')
      .then((res) => Object.entries(res.data))
      .then((res) => res.find(([key, _]) => key == pathname.split('/')[3]))
      .then((res) => setList(res as PopupList | undefined))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className='h-[100vh]'>
      <div className='relative flex justify-center items-center w-full h-14 px-1 py-2 border border-b-black'>
        <button
          onClick={router.back}
          className='absolute left-3 flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 hover:bg-gray-100'
        >
          <div className='text-2xl'>←</div>
        </button>
        {list && <span className='text-xl'>🔥 {list[0]}</span>}
      </div>
      {list && (
        <div className='flex text-sm m-2 -mb-2 text-gray-500'>
          <p className='font-bold text-black ml-1'>{list[1]?.length}개</p>의 팝업스토어가 있습니다.
        </div>
      )}
      <div className='h-full mt-4 pb-44 overflow-auto'>
        {list &&
          list[1]?.map((popup: PopupType) => (
            <PopupCard
              key={popup.id}
              info={popup}
              period={['open', 'opensoon', 'end', 'endsoon']}
            />
          ))}
      </div>
    </div>
  );
}
