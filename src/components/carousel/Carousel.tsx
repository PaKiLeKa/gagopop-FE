'use client';

import { type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import dummy from '../../../public/images/dummy.png';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import Badge from '../badge/Badge';
import { useEffect, useRef, useState } from 'react';

export default function Carouseltest() {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const dummyArray = [dummy, dummy, dummy, dummy, dummy];

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
          {dummyArray.map((_v, index) => (
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
      <CarouselContent className='-ml-2 h-[300px] '>
        {dummyArray.map((v, index) => (
          <CarouselItem key={index} className='relative'>
            <Card>
              <CardContent className='flex aspect-square items-center justify-center '>
                <Image
                  src={v}
                  alt={'팝업스토어명'}
                  layout='fill'
                  objectFit='cover'
                  className='brightness-75'
                />
                <div className='absolute flex flex-col justify-center items-center'>
                  <Badge badgeState='end' />
                  <p className='text-white'>2024.03.27 ~ 2024.03.27</p>
                  <p className='text-white text-2xl font-bold'>위자드몰 팝업스토어</p>
                  <button className='w-[75px] h-8 mt-2 bg-white rounded-full text-xs'>
                    더 알아보기
                  </button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
