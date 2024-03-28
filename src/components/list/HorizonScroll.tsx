'use client';

import Image from 'next/image';
import dummy from '../../../public/images/dummy.png';
import RightArr from '../../../public/icons/rightarrow.svg';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export interface Artwork {
  artist: string;
  art: string;
}

export const works: any = [
  {
    artist: 'Ornella Binni',
    art: dummy,
  },
  {
    artist: 'Tom Byrom',
    art: dummy,
  },
  {
    artist: 'Vladimir Malyavko',
    art: dummy,
  },
  {
    artist: 'asd Malyavko',
    art: dummy,
  },
  {
    artist: 'fasdfasf Malyavko',
    art: dummy,
  },
  {
    artist: 'asdfasdf Malyavko',
    art: dummy,
  },
];

export default function HorizonScroll() {
  return (
    <>
      <div className='flex justify-between w-full px-3'>
        <div className='text-base'>🔥 지금 핫한 팝업스토어</div>
        <div className='flex justify-center items-center'>
          <button className='text-sm text-green-400'>더보기</button>
          <RightArr />
        </div>
      </div>
      <ScrollArea className='w-full whitespace-nowrap rounded-md p-3'>
        <div className='flex w-max space-x-2'>
          {works.map((artwork: any) => (
            <figure key={artwork.artist} className='shrink-0'>
              <div className='overflow-hidden rounded-md'>
                <Image
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  className='h-[100px] w-[100px] object-cover'
                />
              </div>
              <figcaption className='pt-1 text-[10px] w-[100px]'>
                팝업스토어 이름<span className='text-wrap'>{artwork.artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </>
  );
}
