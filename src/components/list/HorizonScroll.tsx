'use client';

import Image from 'next/image';
import dummy from '../../../public/images/dummy.png';
import RightArr from '../../../public/icons/rightarrow.svg';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PopupCategoryList, PopupType } from '@/types/types';

export default function HorizonScroll({ list }: { list: [string, PopupType[]] }) {
  const router = useRouter();

  return (
    <>
      <div className='flex justify-between w-full px-3'>
        <div className='text-base'>🔥 {list[0]}</div>
        <div className='flex justify-center items-center'>
          <Link href={`/popup/list/${list[0].toString()}`} className='text-sm text-green-400'>
            더보기
          </Link>
          <RightArr />
        </div>
      </div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md p-3'>
        <div className='flex w-max space-x-2'>
          {list[1].map((popup: any) => (
            <figure key={popup.id} className='shrink-0'>
              <div className='overflow-hidden rounded-md'>
                <Image
                  onClick={() => {
                    router.push(`/popup/${popup.id}`);
                  }}
                  key={popup.id}
                  src={popup.imageUrl}
                  alt={`${popup.id}`}
                  className='h-[100px] w-[100px] object-cover'
                  width={100}
                  height={100}
                />
              </div>
              <figcaption className='pt-1 text-[10px] w-[100px]'>
                <span className='text-wrap'>{popup.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </>
  );
}
