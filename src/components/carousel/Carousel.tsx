'use client';

import { type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import Badge from '../badge/Badge';
import { useEffect, useRef, useState } from 'react';
import { PopupType } from '@/types/types';
import Link from 'next/link';

export default function Carouseltest({ list }: { list: PopupType[] }) {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const calPeriod = (popup: PopupType) => {
    const today = new Date().getTime();
    const startDate = new Date(popup?.startDate).getTime();
    const endDate = new Date(popup?.endDate).getTime();
    let periodState;
    let diffDay = 0;

    if ((startDate <= today && today <= endDate) || (startDate <= today && startDate === endDate)) {
      periodState = 'open';
      if (Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) < 8) {
        periodState = 'endsoon';
        diffDay = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      }
    } else {
      if (Math.floor((today - endDate) / (1000 * 60 * 60 * 24)) > 0) {
        periodState = 'end';
      } else {
        periodState = 'opensoon';
        diffDay = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
      }
    }

    return { periodState, diffDay };
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className='w-full relative mb-4'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <p className='absolute p-2 pl-3 text-white font-light z-10'>추천 팝업스토어</p>
      <div className='absolute bottom-3 flex justify-center w-full z-10'>
        <div className='flex gap-1'>
          {list?.map((_v, index) => (
            <div
              key={index}
              className={`${
                index + 1 === current ? 'w-4 bg-white' : 'w-1 bg-gray-300'
              } h-1 rounded-full`}
              style={{
                transition: 'width 0.2s ease',
              }}
            ></div>
          ))}
        </div>
      </div>
      <CarouselContent className='-ml-2 h-[300p]'>
        {list?.map((popup, index) => (
          <CarouselItem key={popup.id} className='relative'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center '>
                <Image
                  src={popup.imageUrl}
                  alt={popup.name}
                  layout='fill'
                  objectFit='cover'
                  className='brightness-75'
                />
                <div className='absolute flex flex-col justify-center items-center'>
                  <Badge
                    badgeState={calPeriod(popup).periodState}
                    diff={calPeriod(popup).diffDay}
                  />
                  <p className='text-white'>
                    {popup.startDate.toString().substring(0, 10) +
                      '~' +
                      popup.endDate.toString().substring(0, 10)}
                  </p>
                  <p className='text-white text-2xl font-bold'>{popup.name}</p>
                  <Link href={`/popup/${popup.id}`}>
                    <button className='w-[75px] h-8 mt-2 bg-white rounded-full text-xs hover:bg-gray-200'>
                      더 알아보기
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
